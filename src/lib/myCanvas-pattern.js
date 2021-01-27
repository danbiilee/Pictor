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
