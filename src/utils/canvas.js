export function MyCanvas(canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;
}

// 크롭이미지 로드
MyCanvas.prototype.drawCropImage = function (src) {
  const my = this;
  const img = new Image();
  img.src = src;
  img.onload = function () {
    my.ctx.clearRect(0, 0, my.canvas.width, my.canvas.height);
    my.ctx.globalAlpha = 0.7; // 투명도 설정
    my.ctx.drawImage(this, 0, 0, my.canvas.width, my.canvas.height);
    my.ctx.globalAlpha = 1.0;
  };
};

// 마우스다운 이벤트
MyCanvas.prototype.handleMouseDown = function (e) {
  e.preventDefault();
  e.stopPropagation();
  console.log(e);
};
