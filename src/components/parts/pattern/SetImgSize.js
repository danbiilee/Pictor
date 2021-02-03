import React from 'react';
import { useSelector } from 'react-redux';

import SVG from '../../common/SVG';
import Range from '../../common/Range';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetImgSize = ({ ...props }) => {
  const { selected, handleSelected, width, height, onChange } = props;
  const { pictures, drawnPicture } = useSelector(state => state.pictures);
  const img = new Image();
  if (drawnPicture) {
    img.src = pictures.find(p => p.id === drawnPicture).src;
  }

  console.log('SetImgSize', img.width, img.height, width, height);

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="imgSize" handleSelected={handleSelected}>
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Set Cropped Image Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'imgSize'}>
        W:{' '}
        <Range
          name="imgWidth"
          value={width ? width : img.width}
          min="30"
          max="300"
          step="10"
          onChange={onChange}
        />
        H:{' '}
        <Range
          name="imgHeight"
          value={height ? height : img.height}
          min="30"
          max="300"
          step="10"
          onChange={onChange}
        />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetImgSize;
