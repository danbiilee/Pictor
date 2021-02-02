import React from 'react';
import SVG from '../../common/SVG';
import Input from '../../common/Input';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetImgSize = ({ ...props }) => {
  const { selected, handleSelected, width, height, onChange } = props;
  return (
    <ToggleWrapper>
      <ToggleTitle
        selected={selected}
        type="imgSize"
        handleSelected={handleSelected}
      >
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Set Cropped
        Image Size
      </ToggleTitle>
      <ToggleContent selected={selected === 'imgSize'}>
        W:{' '}
        <Input
          type="number"
          name="imgWidth"
          value={width}
          onChange={onChange}
        />
        H:{' '}
        <Input
          type="number"
          name="imgHeight"
          value={height}
          onChange={onChange}
        />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetImgSize;
