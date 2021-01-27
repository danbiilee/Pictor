export function MyCanvas(wrapper, canvas, ctx, drawnImgSrc) {
  this.wrapper = wrapper;
  this.canvas = canvas;
  this.ctx = ctx;
  this.drawnImgSrc = drawnImgSrc;

  this.offsetX = canvas.offsetLeft;
  this.offsetY = canvas.offsetTop;
  this.points = []; // 클리핑할 영역 좌표값 담을 배열
  this.isCropped = false; // crop() 함수 실행여부
}

// 크롭할 이미지 로드하기
MyCanvas.prototype.initCropImage = function () {
  //const my = this;
  this.drawnImg = new Image();
  this.drawnImg.src = this.drawnImgSrc;
};

// 이미지 비율 유지
const getSizeToKeepImageScale = (img, canvas) => {
  const ratio = img.width / img.height;
  let newWidth = canvas.width;

  let newHeight = newWidth / ratio;
  if (newHeight > canvas.height) {
    newHeight = canvas.height;
    newWidth = newHeight * ratio;
  }
  return { newWidth, newHeight };
};

// 이미지 그리기 (투명도 설정)
MyCanvas.prototype.drawImage = function (alpha) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalAlpha = alpha; // 투명도 설정

  // 그리기
  if (
    this.drawnImg.width < this.canvas.width &&
    this.drawnImg.height < this.canvas.height
  ) {
    this.ctx.drawImage(this.drawnImg, 0, 0);
  } else {
    // 비율 유지
    const { newWidth, newHeight } = getSizeToKeepImageScale(
      this.drawnImg,
      this.canvas,
    );
    this.ctx.drawImage(this.drawnImg, 0, 0, newWidth, newHeight);
  }
  this.ctx.globalAlpha = 1.0;
};

// 마우스다운 이벤트
MyCanvas.prototype.handleMouseDown = function (e) {
  e.preventDefault();
  e.stopPropagation();

  // 마우스 좌표값 계산
  let x = parseInt(e.clientX - this.offsetX);
  let y = parseInt(e.clientY - this.offsetY);
  if (document.documentElement.scrollTop > 0) {
    y += document.documentElement.scrollTop;
  } // 세로 스크롤값 적용

  this.points.push({ x, y });

  // 클리핑 패스 라인 그리기
  this.drawOutline();

  // 사용자가 처음 클릭한 좌표값을 다시 클릭할 경우, 클리핑 영역 완성시키기
  if (this.points.length > 1) {
    let mx = x - this.points[0].x;
    let my = y - this.points[0].y;
    if (mx * mx + my * my < 10 * 10) {
      this.crop();
    }
  }
};

// 클리핑 패스 그리기
MyCanvas.prototype.drawOutline = function () {
  this.drawImage(0.7);

  this.ctx.beginPath();
  this.ctx.moveTo(this.points[0].x, this.points[0].y);
  for (let i = 0; i < this.points.length; i++) {
    this.ctx.lineTo(this.points[i].x, this.points[i].y);
  }
  this.ctx.closePath();
  this.ctx.stroke();

  this.ctx.beginPath();
  this.ctx.arc(this.points[0].x, this.points[0].y, 3, 0, Math.PI * 2);
  this.ctx.closePath();
  this.ctx.stroke();
};

// 새로운 캔버스에 선택된 영역 크롭하기
MyCanvas.prototype.crop = function () {
  // 클리핑 영역 사이즈 계산하기
  let minX = this.wrapper.offsetWidth;
  let minY = this.wrapper.offsetHeight;
  let maxX = 0;
  let maxY = 0;
  for (let i = 1; i < this.points.length; i++) {
    const p = this.points[i];
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  }
  const clippedWidth = maxX - minX;
  const clippedHeight = maxY - minY;

  // 이미지 크롭하기
  this.ctx.save();
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.beginPath();
  this.ctx.moveTo(this.points[0].x, this.points[0].y);
  for (let i = 1; i < this.points.length; i++) {
    const p = this.points[i];
    this.ctx.lineTo(p.x, p.y);
  }
  this.ctx.closePath();

  this.ctx.clip(); // 클립
  this.drawImage(1.0); // 클리핑한 이미지 그리기
  this.ctx.restore();

  // 캔버스 생성
  const c = document.createElement('canvas');
  const cx = c.getContext('2d');
  // 사이즈를 클리핑 영역에 맞추기
  c.width = clippedWidth;
  c.height = clippedHeight;

  // 새로운 캔버스에 크롭이미지 그리기
  cx.drawImage(
    this.canvas,
    minX,
    minY,
    clippedWidth,
    clippedHeight,
    0,
    0,
    clippedWidth,
    clippedHeight,
  );

  // 새로운 이미지 생성. 기존 크롭이미지 대체
  this.drawnImgSrc = c.toDataURL();
  this.isCropped = !this.isCropped;

  // 이전 포인트 지우기
  this.points.length = 0;
};

MyCanvas.prototype.makePattern = function (prop = null) {
  // 패턴 설정값
  let {
    color,
    canvasWidth,
    canvasHeight,
    imgWidth,
    imgHeight,
    gap,
    type,
  } = prop;
  canvasWidth = parseInt(canvasWidth ? canvasWidth : this.canvas.width, 10);
  canvasHeight = parseInt(canvasHeight ? canvasWidth : this.canvas.height, 10);
  imgWidth = parseInt(imgWidth ? imgWidth : this.drawnImg.width, 10);
  imgHeight = parseInt(imgHeight ? imgHeight : this.drawnImg.height, 10);
  gap = parseInt(gap, 10);

  this.ctx.save();
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  // 배경색 설정
  this.ctx.beginPath();
  this.ctx.fillStyle = color;
  this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  this.ctx.closePath();

  // 이미지 뿌리기
  const loopX = Math.ceil(canvasWidth / (gap + imgWidth));
  const loopY = Math.ceil(canvasHeight / (gap + imgHeight));

  console.log('makePattern', canvasWidth, gap, imgWidth, loopX, loopY);

  let y = 0;
  for (let i = 0; i < loopY; i++) {
    // 행
    let x = i % 2 === 0 ? 0 : gap;
    for (let j = 0; j < loopX; j++) {
      // 열
      this.ctx.drawImage(this.drawnImg, x, y, imgWidth, imgHeight); // height는 오토로
      x += imgWidth + gap;
    }
    y += imgHeight + gap;
    console.log(x, y);
  }
  this.ctx.restore();

  // 캔버스 생성
  const c = document.createElement('canvas');
  const cx = c.getContext('2d');
  // 사이즈 설정(prop.bgWidth, prop.bgHeight)
  c.width = canvasWidth;
  c.height = canvasHeight;

  // 새로운 캔버스에 패턴 그리기
  cx.drawImage(this.canvas, 0, 0, canvasWidth, canvasHeight);
  this.drawnImgSrc = c.toDataURL();
  //this.drawImage(1.0);

  // const my = this;
  // const img = new Image();
  // img.src = c.toDataURL();
  // img.onload = function () {
  //   // 새 이미지 페이지에 삽입하기
  //   my.wrapper.appendChild(this);
  // };
};
