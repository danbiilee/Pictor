import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MyCanvas } from '../../utils/canvas';

const Wrapper = styled.div`
  width: 100%;
  height: 99.9%;
`;
const CanvasBlock = styled.canvas`
  background-color: #fff;
`;

const Canvas = ({ activeTarget, setMyCanvas }) => {
  const { particles, selectedParticles, selectedCrop } = useSelector(
    state => state.particles,
  );
  //console.log('Canvas', activeTarget);

  const wrapperRef = useRef();
  const canvasRef = useRef();
  const ctx = useRef();

  // 마운트 시점 캔버스 부모영역 사이즈
  let innerWidth = 0;
  let innerHeight = 0;

  useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      innerWidth = wrapperRef.current.offsetWidth;
      innerHeight = wrapperRef.current.offsetHeight;

      canvasRef.current.width = innerWidth;
      canvasRef.current.height = innerHeight;

      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  useEffect(() => {
    if (activeTarget === 'crop') {
      console.log('crop!!!!');

      // myCanvas 생성
      const cropImgSrc = particles.find(item => item.id === selectedCrop).src;
      const my = new MyCanvas(
        wrapperRef.current,
        canvasRef.current,
        ctx.current,
        cropImgSrc,
      );
      setMyCanvas(my);

      // 크롭할 이미지 초기화
      my.initCropImage();

      const that = my;
      my.cropImg.onload = function () {
        that.drawImage(0.7);

        // 그리기 이벤트 감지
        that.canvas.addEventListener('mousedown', function (e) {
          that.handleMouseDown(e);

          if (that.isCropped) {
            console.log('Canvas: crop 됐다!!!!!');
          }
        });
      };
    }

    if (!activeTarget || activeTarget === 'clear') {
      //console.log('clear!!!!');
      // clear canvas
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
  }, [activeTarget, selectedCrop]);

  return (
    <Wrapper ref={wrapperRef}>
      <CanvasBlock ref={canvasRef} />
    </Wrapper>
  );
};

export default React.memo(Canvas);
