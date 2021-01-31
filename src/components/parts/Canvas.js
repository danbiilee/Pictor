import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { MyCanvas } from '../../lib/myCanvas';

const Wrapper = styled.div`
  width: 100%;
  height: 99.9%;
`;
const CanvasBlock = styled.canvas`
  background-color: #fff;
`;

const Canvas = ({ setMyCanvas }) => {
  const { pictures, drawnPicture, canvasMode, properties } = useSelector(
    state => state.pictures,
  );
  console.log('Canvas', drawnPicture, canvasMode, properties);

  const wrapperRef = useRef();
  const canvasRef = useRef();
  const ctx = useRef();
  const my = useRef();

  // 마운트 시점 부모영역 사이즈에 맞추기
  useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      canvasRef.current.width = wrapperRef.current.offsetWidth;
      canvasRef.current.height = wrapperRef.current.offsetHeight;

      ctx.current = canvasRef.current.getContext('2d');
    }
  }, []);

  useEffect(() => {
    if (drawnPicture) {
      console.log('drawnPicture selected!');
      // myCanvas 생성
      const cropImgSrc = pictures.find(pic => pic.id === drawnPicture).src;
      my.current = new MyCanvas(
        wrapperRef.current,
        canvasRef.current,
        ctx.current,
        cropImgSrc,
      );
      setMyCanvas(my.current);

      // 이미지 초기화
      my.current.initCropImage();

      const that = my.current;
      my.current.drawnImg.onload = function () {
        that.drawImage(1.0);
      };
    }
  }, [drawnPicture, setMyCanvas, pictures]);

  useEffect(() => {
    if (canvasMode === 'crop') {
      console.log('crop!!!!');

      const that = my.current;
      my.current.drawImage(0.7);

      // 그리기 이벤트 감지
      my.current.canvas.addEventListener('mousedown', function (e) {
        that.handleMouseDown(e);
      });
    }

    if (canvasMode === 'pattern') {
      console.log('pattern!!!!');
      my.current.makePattern(properties);
    }

    if (canvasMode === 'clear') {
      console.log('clear!!!!');
      // clear canvas
      ctx.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height,
      );
    }
    return () => {
      console.log('unmout');
      if (my.current) {
        my.current.canvas.removeEventListener(
          'mousedown',
          my.current.handleMouseDown,
        );
      }
    };
  }, [canvasMode, properties]);

  return (
    <Wrapper ref={wrapperRef}>
      <CanvasBlock ref={canvasRef} />
    </Wrapper>
  );
};

export default React.memo(Canvas);
