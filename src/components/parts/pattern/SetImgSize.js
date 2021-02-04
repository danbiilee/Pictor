import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

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

const SetImgSize = ({ ...props }) => {
  const { selected, handleSelected, onChange } = props;
  const { pictures, drawnPicture, properties } = useSelector(state => state.pictures);
  const { imgWidth: width, imgHeight: height } = properties;

  const img = new Image();
  if (drawnPicture) {
    img.src = pictures.find(p => p.id === drawnPicture).src;
  }

  //console.log('SetImgSize', img.width, img.height, width, height);

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="imgSize" handleSelected={handleSelected}>
        Cropped Image Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'imgSize'} column>
        <Inner>
          <Block>W:</Block>
          <Range
            name="imgWidth"
            value={width ? width : img.width}
            min="30"
            max="300"
            step="10"
            onChange={onChange}
          />
        </Inner>
        <Inner>
          <Block>H:</Block>
          <Range
            name="imgHeight"
            value={height ? height : img.height}
            min="30"
            max="300"
            step="10"
            onChange={onChange}
          />
        </Inner>
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetImgSize;
