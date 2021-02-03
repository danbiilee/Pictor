import React, { useState, useEffect, useRef } from 'react';

import SVG from '../../common/SVG';
import Range from '../../common/Range';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetCVSize = ({ ...props }) => {
  const { selected, handleSelected, canvasWidth, canvasHeight, setProperties } = props;

  const canvasRef = useRef(document.querySelector('canvas'));
  const [userSize, setUserSize] = useState({
    width: canvasWidth ? canvasWidth : canvasRef.current.offsetWidth,
    height: canvasHeight ? canvasHeight : canvasRef.current.offsetHeight,
  });

  const onChange = e => {
    let { name, value } = e.target;
    setUserSize({ ...userSize, [name]: value });
  };

  //console.log('SetCVSize', canvasWidth, canvasHeight, userSize);

  useEffect(() => {
    setProperties(properties => ({
      ...properties,
      canvasWidth: userSize.width,
      canvasHeight: userSize.height,
    }));
  }, [canvasWidth, canvasHeight, userSize]);

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="canvasSize" handleSelected={handleSelected}>
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Background Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'canvasSize'}>
        W:{' '}
        <Range
          name="width"
          value={userSize.width}
          onChange={onChange}
          min="100"
          max="1920"
          step="30"
        />
        H:{' '}
        <Range
          name="height"
          value={userSize.height}
          onChange={onChange}
          min="100"
          max="1080"
          step="30"
        />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetCVSize;
