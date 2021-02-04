import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProperties } from '../../redux/pictures';
import styled from 'styled-components';

import { debounce } from '../../utils/commonUtils';
import { MyCanvas } from '../../lib/myCanvas';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const CanvasBlock = styled.canvas`
  background-color: #eee;
`;

const Canvas = ({ setMyCanvas }) => {
  const { pictures, drawnPicture, canvasMode, properties } = useSelector(state => state.pictures);

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const wrapperRef = useRef();
  const canvasRef = useRef();
  const my = useRef(); // 캔버스
  const ctx = useRef();
  //console.log('Canvas', drawnPicture, properties);

  // 캔버스 사이즈 변경
  const handleResize = () => {
    setCanvasSize({
      width: wrapperRef.current.offsetWidth,
      height: wrapperRef.current.offsetHeight - 1,
    });
  };

  // 컴포넌트 마운트,언마운트 시 리사이즈 이벤트 적용
  useEffect(() => {
    if (wrapperRef.current && canvasRef.current) {
      handleResize(); // 첫 마운트시 즉시 사이즈 적용
      ctx.current = canvasRef.current.getContext('2d');
    }

    // debounce 적용
    window.addEventListener('resize', debounce(handleResize, 1000));

    return () => {
      // cleanup
      window.removeEventListener('resize', debounce(handleResize, 1000));
    };
  }, []);

  // 리사이즈된 부모영역에 맞게 캔버스 사이즈 재조정
  useEffect(() => {
    const { width, height } = canvasSize;

    // 그려뒀던 이미지 있는 경우, 다시 그림
    if (drawnPicture && my.current) {
      my.current.resizeCanvas(width, height, canvasMode, properties);
      return;
    }

    // 아닌 경우 바로 캔버스 리사이즈
    if (width && height) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    }
    // properties는 deps에 넣지 않음. makePattern 중복해서 발생됨
  }, [canvasSize, drawnPicture, canvasMode]);

  // 선택이미지 변경 시 캔버스 재생성
  useEffect(() => {
    // myCanvas 생성
    const cropImgSrc = drawnPicture ? pictures.find(pic => pic.id === drawnPicture).src : null;
    my.current = new MyCanvas(wrapperRef.current, canvasRef.current, ctx.current, cropImgSrc);
    my.current.initCropImage(); // 이미지 초기화
    setMyCanvas(my.current);

    switch (canvasMode) {
      case 'crop':
        console.log('crop!!!!');
        my.current.drawnImg.onload = function () {
          my.current.drawImage(1.0);
        };
        my.current.canvas.addEventListener('mousedown', function (e) {
          my.current.handleMouseDown(e);
        });
        break;
      case 'pattern':
        console.log('pattern!!!!');
        my.current.makePattern(properties);
        break;
      case 'clear':
        console.log('clear!!!!');
        // clear canvas
        my.current.clear();
        break;
    }
    // if (my.current) {
    //   my.current.canvas.removeEventListener(
    //     'mousedown',
    //     my.current.handleMouseDown,
    //   );
    // }
  }, [drawnPicture, pictures, canvasMode, setMyCanvas, properties]);

  return (
    <Wrapper ref={wrapperRef}>
      <CanvasBlock ref={canvasRef} />
    </Wrapper>
  );
};

export default React.memo(Canvas);
