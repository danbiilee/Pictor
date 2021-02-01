import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '../common/Button';
import SVG from '../common/SVG';

const Ul = styled.ul`
  overflow-y: auto;
  flex: 1 0 500px;
  padding: 3px;
`;
const Li = styled.li`
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
  border: ${props => (props.isSelected ? '3px solid #fff' : 0)};
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: contain;
`;

const SelectBlock = styled.div`
  position: absolute;
  visibility: ${props => (props.isSelected ? 'visible' : 'hidden')};
  width: 100%;
  height: 130px;
  background: rgba(0, 0, 0, 0.4);
`;

const filterListByType = (pictures, type) => {
  if (!pictures || !pictures.length) {
    return pictures;
  }

  let result;
  if (type === 'all') {
    result = pictures;
  } else {
    result = pictures.filter(pic => pic.type === type);
  }
  return result;
};

const Images = ({ selectedType, selectedList, onToggle }) => {
  const dispatch = useDispatch();
  const { pictures } = useSelector(state => state.pictures);

  // 렌더링될 이미지 필터링
  let filteredImages = useMemo(() => filterListByType(pictures, selectedType), [
    pictures,
    selectedType,
  ]);

  // 선택여부 속성 추가
  if (filteredImages && filteredImages.length) {
    filteredImages = filteredImages.map(img => {
      const check = selectedList.includes(img.id);
      return check
        ? { ...img, isSelected: true }
        : { ...img, isSelected: false };
    });
  }

  //console.log('ImageList', selectedType, pictures, filteredImages);

  return (
    <Ul>
      {filteredImages && filteredImages.length
        ? filteredImages.map(img => (
            <Li
              key={img.id}
              isSelected={img.isSelected}
              onClick={() => onToggle(img.id)}
            >
              <SelectBlock isSelected={img.isSelected} />
              <Img alt="uploaded image" src={img.src} />
            </Li>
          ))
        : null}
    </Ul>
  );
};

export default Images;
