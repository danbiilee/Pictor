import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Ul = styled.ul`
  overflow-y: auto;
  flex: 1 0 500px;
  flex-basis: auto;
  width: 100%;
  padding: 10px;
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
  height: fit-content;
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

const Images = React.memo(({ selectedType, selectedList, onToggle }) => {
  //console.log('Images', selectedType, selectedList);

  const { pictures } = useSelector(state => state.pictures);

  // 렌더링될 이미지 필터링
  let filteredImages = useMemo(() => filterListByType(pictures, selectedType), [
    pictures,
    selectedType,
  ]);

  // 선택여부 속성 추가
  const bool = filteredImages && filteredImages.length;
  if (bool) {
    filteredImages = filteredImages.map(img => {
      const check = selectedList.includes(img.id);
      return check ? { ...img, isSelected: true } : { ...img, isSelected: false };
    });
  }
  //console.log('ImageList', selectedType, pictures, filteredImages);

  return (
    <Ul>
      {bool
        ? filteredImages.map(img => <ImageItem key={img.id} img={img} onToggle={onToggle} />)
        : null}
    </Ul>
  );
});

const ImageItem = React.memo(({ img, onToggle }) => {
  const { id, isSelected, src } = img;
  //console.log('ImageItem');

  return (
    <Li isSelected={isSelected} onClick={() => onToggle(id)}>
      <SelectBlock isSelected={isSelected} />
      <Img alt="uploaded image" src={src} />
    </Li>
  );
});

export default Images;
