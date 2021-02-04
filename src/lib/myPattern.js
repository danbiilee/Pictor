import { MyCanvas } from './myCanvas';

export class MyPattern extends MyCanvas {
  constructor(wrapper, canvas, ctx, drawImageSrc) {
    super(wrapper, canvas, ctx, drawImageSrc);
  }

  color = null;
  canvasWidth = null;
  canvasHeight = null;
  imgWidth = null;
  imgHeight = null;
  gap = null;
  type = null;
  loopX = null;
  loopY = null;

  set setColor(value) {
    this.color = value;
  }
  set setCanvasWidth(value) {
    this.canvasWidth = parseInt(value ? value : this.canvas.width, 10);
  }
  set setCanvasHeight(value) {
    this.canvasHeight = parseInt(value ? value : this.canvas.height, 10);
  }
  set setImgWidth(value) {
    this.imgWidth = parseInt(value ? value : this.drawnImg.width, 10);
  }
  set setImgHeight(value) {
    this.imgHeight = parseInt(value ? value : this.drawnImg.height, 10);
  }
  set setGap(value) {
    this.gap = parseInt(value, 10);
  }
  set setType(value) {
    this.type = value;
  }

  // src 리턴
  get getPatternSrc() {
    this.makePattern();

    // 캔버스 생성
    const c = document.createElement('canvas');
    const cx = c.getContext('2d');
    // 패턴 사이즈에 맞추기
    c.width = this.canvasWidth;
    c.height = this.canvasHeight;
    cx.drawImage(
      this.canvas,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
      0,
      0,
      this.canvasWidth,
      this.canvasHeight,
    );
    return c.toDataURL('image/jpeg', 1);
  }

  makePattern() {
    this.drawBackgroundColor(); // 배경색 그리기

    // 설정한 캔버스 사이즈만큼 context 크기 잘라두고 그 안에서 패턴 뿌림
    this.ctx.save();
    this.ctx.rect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.clip();

    // 이미지 그리기
    this.loopX = Math.ceil(this.canvasWidth / (this.gap + this.imgWidth));
    this.loopY = Math.ceil(this.canvasHeight / (this.gap + this.imgHeight));

    switch (this.type) {
      case 'vanilla':
      case 'vanilla-zigzag':
        this.drawPatternVanila();
        break;
      case 'fold':
      case 'fold-zigzag':
      case 'flip':
      case 'flip-zigzag':
        this.drawPatternFlip();
        break;
      case 'linefold':
      case 'linefold-zigzag':
      case 'lineflip':
      case 'lineflip-zigzag':
        this.drawPatternLine();
        break;
    }

    // 그 뒤 다시 이전 context로 restore
    this.ctx.restore();
  }

  drawBackgroundColor() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.closePath();
  }

  getXVanilla(i) {
    if (this.type.includes('zigzag')) {
      return i % 2 === 0 ? 0 : this.gap;
    }
    return 0;
  }

  getXFlip(i, flipType) {
    // horizontal
    if (flipType === 'fold') {
      if (this.type.includes('zigzag')) {
        return {
          flip: i % 2 === 0 ? this.imgWidth : this.imgWidth + this.gap,
          nonFlip: i % 2 === 0 ? this.imgWidth + this.gap : this.imgWidth + this.gap * 2,
        };
      }
      return {
        flip: this.imgWidth,
        nonFlip: this.imgWidth + this.gap,
      };
    }
    // vertical
    else {
      return this.getXVanilla(i);
    }
  }

  getYFlip(flipType) {
    // horizontal
    if (flipType === 'fold') {
      return 0;
    }
    // vertical
    else {
      return {
        flip: this.imgHeight,
        nonFlip: 0,
      };
    }
  }

  getXLine(flipType) {
    if (flipType === 'fold') {
      if (this.type.includes('zigzag')) {
        return this.imgWidth + this.gap;
      }
      return this.imgWidth;
    }
    return this.type.includes('zigzag') ? this.gap : 0;
  }

  drawPatternVanila() {
    let y = 0;
    // 행
    for (let i = 0; i < this.loopY; i++) {
      let x = this.getXVanilla(i);
      // 열
      for (let j = 0; j < this.loopX; j++) {
        this.ctx.drawImage(this.drawnImg, x, y, this.imgWidth, this.imgHeight);
        x += this.imgWidth + this.gap;
      }
      y += this.imgHeight + this.gap;
    }
  }

  drawPatternFlip() {
    // fold: horizontal, flip: vertical
    const flipType = this.type.includes('fold') ? 'fold' : 'flip';
    const scaleH = flipType === 'fold' ? -1 : 1;
    const scaleV = flipType === 'flip' ? -1 : 1;
    let y = this.getYFlip(flipType);

    // 행
    for (let i = 0; i < this.loopY; i++) {
      let x = this.getXFlip(i, flipType);
      let flipFlag = false; // 플립 여부

      // 열
      for (let j = 0; j < this.loopX; j++) {
        flipFlag = !flipFlag;
        let key = flipFlag ? 'flip' : 'nonFlip';
        let posX, posY;
        if (flipType === 'fold') {
          posX = flipFlag ? x.flip : x.nonFlip;
          posY = y;
        } else {
          posX = x;
          posY = flipFlag ? y.flip : y.nonFlip;
        }

        if (flipFlag) {
          this.ctx.save();
          this.ctx.scale(scaleH, scaleV);
          if (flipType === 'fold') {
            posX *= -1;
          } else {
            posY *= -1;
          }
          this.ctx.drawImage(this.drawnImg, posX, posY, this.imgWidth, this.imgHeight);
          this.ctx.restore();
          if (flipType === 'fold') {
            posX *= -1;
          } else {
            posY *= -1;
          }
        } else {
          this.ctx.drawImage(this.drawnImg, posX, posY, this.imgWidth, this.imgHeight);
        }

        if (flipType === 'fold') {
          x[key] += (this.imgWidth + this.gap) * 2;
        } else {
          x += this.imgWidth + this.gap;
        }
      }

      if (flipType === 'fold') {
        y += this.imgHeight + this.gap;
      } else {
        y.flip += this.imgHeight + this.gap;
        y.nonFlip += this.imgHeight + this.gap;
      }
    }
  }

  drawPatternLine() {
    // fold: horizontal, flip: vertical
    const flipType = this.type.includes('fold') ? 'fold' : 'flip';
    const scaleH = flipType === 'fold' ? -1 : 1;
    const scaleV = flipType === 'flip' ? -1 : 1;
    let y = flipType === 'fold' ? 0 : this.imgHeight;
    let flipFlag = false; // 플립 여부

    // 행
    for (let i = 0; i < this.loopY; i++) {
      flipFlag = !flipFlag;
      let x = flipFlag ? this.getXLine(flipType) : 0;

      // 열
      for (let j = 0; j < this.loopX; j++) {
        if (flipFlag) {
          this.ctx.save();
          this.ctx.scale(scaleH, scaleV);
          if (flipType === 'fold') {
            x *= -1;
          } else {
            y *= -1;
          }
          this.ctx.drawImage(this.drawnImg, x, y, this.imgWidth, this.imgHeight);
          this.ctx.restore();
          if (flipType === 'fold') {
            x *= -1;
          } else {
            y *= -1;
          }
        } else {
          this.ctx.drawImage(this.drawnImg, x, y, this.imgWidth, this.imgHeight);
        }

        x += this.imgWidth + this.gap;
      }

      if (flipType === 'fold') {
        y += this.imgHeight + this.gap;
      } else {
        y = flipFlag ? y + this.gap : y + this.imgHeight + this.gap * 2;
      }
    }
  }
}
