export function MyCanvas(wrapper, canvas, ctx, cropImgSrc) {
  this.wrapper = wrapper;
  this.canvas = canvas;
  this.ctx = ctx;
  this.cropImgSrc = cropImgSrc;

  this.offsetX = canvas.offsetLeft;
  this.offsetY = canvas.offsetTop;
  this.points = []; // 클리핑할 영역 좌표값 담을 배열
  this.isCropped = false; // crop() 함수 실행여부
}

// 크롭할 이미지 로드하기
MyCanvas.prototype.initCropImage = function () {
  //const my = this;
  this.cropImg = new Image();
  this.cropImg.src = this.cropImgSrc;
  // this.cropImg.onload = function () {
  //   // resize canvas to fit the img
  //   // cw=canvas.width=img.width;
  //   // ch=canvas.height=img.height;
  //   my.drawImage(alpha);

  //   // 그리기 이벤트 감지
  //   my.canvas.addEventListener('mousedown', function (e) {
  //     my.handleMouseDown(e);
  //   });
  // };
};

// 이미지 그리기 (투명도 설정)
MyCanvas.prototype.drawImage = function (alpha) {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalAlpha = alpha; // 투명도 설정
  this.ctx.drawImage(this.cropImg, 0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalAlpha = 1.0;
};

// 마우스다운 이벤트
MyCanvas.prototype.handleMouseDown = function (e) {
  e.preventDefault();
  e.stopPropagation();

  // 마우스 좌표값 계산
  const x = parseInt(e.clientX - this.offsetX);
  const y = parseInt(e.clientY - this.offsetY);

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
  //console.log('clipping area points', minX, minY, maxX, maxY);
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

  this.ctx.clip();
  this.ctx.drawImage(this.cropImg, 0, 0, this.canvas.width, this.canvas.height);
  this.ctx.restore();

  // 캔버스 생성
  const c = document.createElement('canvas');
  const cx = c.getContext('2d');
  // 사이즈를 클리핑 영역에 맞추기
  c.width = clippedWidth;
  c.height = clippedHeight;
  //console.log('new canvas size', c.width, c.height);

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
  this.cropImgSrc = c.toDataURL();
  this.isCropped = !this.isCropped;
  console.log('crop(): crop 됐다!!!!!');

  // indexedDB에 저장

  // try {
  //   dispatch(addParticle({ file: this.cropImgSrc }));
  //   if (result) {
  //     this.loadImg(1.0); // 이미지 로드 + 그리기
  //   }
  // } catch (e) {
  //   console.log('Error: Saving Cropped Image', e);
  // }

  // const my = this;
  // this.cropImg = new Image();
  // this.cropImg.src = c.toDataURL();
  // this.cropImg.onload = function () {
  //   // 새 이미지 페이지에 삽입하기
  //   my.wrapper.appendChild(this);
  // };

  // 이전 포인트 지우기
  this.points.length = 0;
};
