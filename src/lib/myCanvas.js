import { getSizeToKeepImageScale } from '../utils/commonUtils';
import { MyPattern } from './myPattern';

export function MyCanvas(wrapper, canvas, ctx, drawnImgSrc) {
  this.wrapper = wrapper;
  this.canvas = canvas;
  this.ctx = ctx;
  this.drawnImgSrc = drawnImgSrc;
  this.drawnImg = null;

  this.offsetX = canvas.offsetLeft;
  this.offsetY = canvas.offsetTop;
  this.points = []; // 클리핑할 영역 좌표값 담을 배열
  this.isCropped = false; // crop() 함수 실행여부
}

// 캔버스 리사이즈 시 원본 유지
MyCanvas.prototype.resizeCanvas = function (...args) {
  const [width, height, canvasMode, properties] = args;
  const c = document.createElement('canvas');
  const cx = c.getContext('2d');

  //console.log('resizeCanvas', width, properties.canvasWidth);

  // 이전 캔버스 저장
  c.width = this.canvas.width;
  c.height = this.canvas.height;
  cx.drawImage(this.canvas, 0, 0);

  this.canvas.width = width;
  this.canvas.height = height;

  switch (canvasMode) {
    case 'crop':
      this.ctx.drawImage(c, 0, 0);
      break;
    case 'pattern':
      // 변경된 사이즈 적용 -> 사용자정의값 무시됨
      properties.canvasWidth = width;
      properties.canvasHeight = height;
      this.makePattern(properties);
      break;
  }
};

// 캔버스 클리어하기
MyCanvas.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

// 크롭할 이미지 로드하기
MyCanvas.prototype.initCropImage = function () {
  //console.log('initCropImage', this.drawnImgSrc.substr(20, 30));
  this.clear();
  this.drawnImg = new Image();
  this.drawnImg.src = this.drawnImgSrc;
};

// 이미지 그리기 (투명도 설정)
MyCanvas.prototype.drawImage = function (alpha) {
  //console.log('drawImage', this.drawnImg.src.substr(20, 30));
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.ctx.globalAlpha = alpha; // 투명도 설정

  // 그리기
  if (this.drawnImg.width < this.canvas.width && this.drawnImg.height < this.canvas.height) {
    this.ctx.drawImage(this.drawnImg, 0, 0);
  } else {
    // 비율 유지
    const { newWidth, newHeight } = getSizeToKeepImageScale(this.drawnImg, this.canvas);
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

MyCanvas.prototype.makePattern = function (props) {
  const myPattern = new MyPattern(this.wrapper, this.canvas, this.ctx, this.drawnImgSrc);
  myPattern.initCropImage();

  // 설정값 초기화
  myPattern.setColor = props.color;
  myPattern.setCanvasWidth = props.canvasWidth;
  myPattern.setCanvasHeight = props.canvasHeight;
  myPattern.setImgWidth = props.imgWidth;
  myPattern.setImgHeight = props.imgHeight;
  myPattern.setGap = props.gap;
  myPattern.setType = props.type;

  myPattern.makePattern();

  // const my = this;
  // const img = new Image();
  // img.src = c.toDataURL();
  // img.onload = function () {
  //   // 새 이미지 페이지에 삽입하기
  //   my.wrapper.appendChild(this);
  // };
};
