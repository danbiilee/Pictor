import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeDrawnPicture } from '../../../redux/pictures';

import Images from '../../parts/Images';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetImage = ({ selected, handleSelected }) => {
  const dispatch = useDispatch();

  // 선택 크롭 이미지 관리
  const [selectedCrop, setSelectedCrop] = useState([]);
  const onToggle = useCallback(
    id => {
      if (!selectedCrop.includes(id)) {
        setSelectedCrop([id]);
        dispatch(changeDrawnPicture(id));
      }
    },
    [selectedCrop, dispatch],
  );

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="img" handleSelected={handleSelected}>
        Select Image
      </ToggleTitle>
      <ToggleContent selected={selected === 'img'} column>
        <Images selectedType="crop" selectedList={selectedCrop} onToggle={onToggle} />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetImage;
