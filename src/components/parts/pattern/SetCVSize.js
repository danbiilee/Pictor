import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProperties } from '../../../redux/pictures';

import SVG from '../../common/SVG';
import Input from '../../common/Input';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetCVSize = ({ ...props }) => {
  const dispatch = useDispatch();
  const { selected, handleSelected, properties, setProperties } = props;
  const { canvasWidth, canvasHeight } = properties;

  const canvasRef = useRef(document.querySelector('canvas'));
  const [userWidth, setUserWidth] = useState(
    canvasWidth ? canvasWidth : canvasRef.current.offsetWidth,
  );
  const [userHeight, setUserHeight] = useState(
    canvasHeight ? canvasHeight : canvasRef.current.offsetHeight,
  );

  const onChange = e => {
    let { name, value } = e.target;
    if (value < 100) {
      value = 100; // 최소값 100
      alert('⚠ 캔버스 사이즈는 100px 이하로 설정할 수 없습니다 ⚠');
    }
    switch (name) {
      case 'canvasWidth':
        setUserWidth(value);
        break;
      case 'canvasHeight':
        setUserHeight(value);
        break;
    }
  };

  //console.log('SetCVSize', canvasWidth, canvasHeight, userWidth, userHeight);

  useEffect(() => {
    // 둘 다 변경되었을 때만 최종 반영?
    setProperties(properties => ({
      ...properties,
      canvasWidth: userWidth,
      canvasHeight: userHeight,
    }));
  }, [canvasWidth, canvasHeight, userWidth, userHeight]);

  return (
    <ToggleWrapper>
      <ToggleTitle
        selected={selected}
        type="canvasSize"
        handleSelected={handleSelected}
      >
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Background Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'canvasSize'}>
        W:{' '}
        <Input
          type="number"
          name="canvasWidth"
          value={userWidth}
          onChange={onChange}
        />
        H:{' '}
        <Input
          type="number"
          name="canvasHeight"
          value={userHeight}
          onChange={onChange}
        />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetCVSize;
