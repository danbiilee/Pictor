import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { debounce } from '../../utils/commonUtils';
import { MyCanvas } from '../../lib/myCanvas';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CanvasBlock = styled.canvas`
  background-color: #fff;
`;

const Canvas = ({ setMyCanvas }) => {
  const { pictures, drawnPicture, canvasMode, properties } = useSelector(
    state => state.pictures,
  );
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const wrapperRef = useRef();
  const canvasRef = useRef();
  const my = useRef(); // 캔버스 객체
  const ctx = useRef();
  //console.log('Canvas', drawnPicture, canvasMode, properties);

  // 캔버스 사이즈 변경
  const handleResize = () =>
    setCanvasSize({
      width: wrapperRef.current.offsetWidth,
      height: wrapperRef.current.offsetHeight - 1,
    });

  // 캔버스 (재)설정 및 생성
  const resetMyCanvas = drawnPicture => {
    if (drawnPicture) {
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
  };

  // 컴포넌트 마운트/언마운트 시 처리
  useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      handleResize(); // 첫 마운트시 즉시 사이즈 적용
      ctx.current = canvasRef.current.getContext('2d');
    }

    // 리사이즈 이벤트 핸들러, debounce 적용
    window.addEventListener('resize', debounce(handleResize, 1000));

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(handleResize, 1000));
    };
  }, []);

  // 리사이즈된 부모영역에 맞게 캔버스 사이즈 재조정
  useEffect(() => {
    const { width, height } = canvasSize;
    if (width && height) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }

    // 캔버스 리사이즈된 경우 캔버스랑 context 설정들 전부 리셋됨
    if (drawnPicture) {
      resetMyCanvas(drawnPicture);
    }
  }, [canvasSize]);

  // 선택한 이미지 바뀐 경우 캔버스 재생성
  useEffect(() => {
    if (drawnPicture) {
      resetMyCanvas(drawnPicture);
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
      //console.log('unmout');
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
