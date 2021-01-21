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

const Canvas = ({ activeTarget }) => {
  const { particles, selectedParticles, selectedCrop } = useSelector(
    state => state.particles,
  );
  console.log('Canvas', activeTarget);

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
      const my = new MyCanvas(canvasRef.current, ctx.current);

      // 크롭이미지 로드
      my.drawCropImage(particles.find(item => item.id === selectedCrop).file);

      //
      my.canvas.addEventListener('mousedown', function (e) {
        my.handleMouseDown(e);
      });
    }

    if (!activeTarget || activeTarget === 'clear') {
      console.log('clear!!!!');
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
