import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import Button from '../common/Button';
import SVG from '../common/SVG';

const Ul = styled.ul`
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

const filterListByType = (particles, type) => {
  let result;
  if (type === 'all') {
    result = particles;
  } else {
    result = particles.filter(p => p.type === type);
  }
  return result;
};

const Images = ({ selectedType, selectedList, onToggle }) => {
  const dispatch = useDispatch();
  const { particles } = useSelector(state => state.particles);

  // 렌더링될 이미지 필터링
  let filteredImages = useMemo(
    () => filterListByType(particles, selectedType),
    [particles, selectedType],
  );

  // 선택여부 속성 추가
  filteredImages = filteredImages.map(img => {
    const check = selectedList.includes(img.id);
    return check ? { ...img, isSelected: true } : { ...img, isSelected: false };
  });

  //console.log('ImageList', selectedType, particles, filteredImages);

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
