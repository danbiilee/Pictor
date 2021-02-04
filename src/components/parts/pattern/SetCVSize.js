import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { initialData } from '../../../redux/pictures';

import Range from '../../common/Range';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const Inner = styled.div`
  display: flex;
  &:first-of-type {
    margin-bottom: 10px;
  }
`;

const Block = styled.div`
  flex-basis: 20%;
`;

const SetCVSize = ({ ...props }) => {
  const { selected, handleSelected, setProperties } = props;

  const defaultProps = initialData.properties;
  const { properties } = useSelector(state => state.pictures);
  const { canvasWidth, canvasHeight } = properties;

  const nodes = document.querySelectorAll('canvas');
  const canvasRef = useRef(nodes.length > 1 ? nodes[1] : nodes[0]);
  const [userSize, setUserSize] = useState({
    width: canvasWidth ? canvasWidth : canvasRef.current.width,
    height: canvasHeight ? canvasHeight : canvasRef.current.height,
  });

  const onChange = e => {
    let { name, value } = e.target;
    setUserSize({ ...userSize, [name]: value });
  };

  //console.log('SetCVSize', canvasWidth, canvasHeight, userSize);

  useEffect(() => {
    // 설정이 리셋됐을 때
    if (isEqual(properties, defaultProps)) {
      setUserSize({ width: canvasRef.current.width, height: canvasRef.current.height });
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    setProperties(properties => ({
      ...properties,
      canvasWidth: userSize.width,
      canvasHeight: userSize.height,
    }));
  }, [userSize]);

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="canvasSize" handleSelected={handleSelected}>
        Background Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'canvasSize'} column>
        <Inner>
          <Block>W:</Block>
          <Range
            name="width"
            value={userSize.width}
            onChange={onChange}
            min="100"
            max="1920"
            step="30"
          />
        </Inner>
        <Inner>
          <Block>H:</Block>
          <Range
            name="height"
            value={userSize.height}
            onChange={onChange}
            min="100"
            max="1080"
            step="30"
          />
        </Inner>
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetCVSize;
