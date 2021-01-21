import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteParticle,
  addSelectedParticle,
  deleteSelectedParticle,
  clearSelectedParticle,
  addSelectedCrop,
  deleteSelectedCrop,
} from '../../redux/particles';
import styled from 'styled-components';

import TopButtons from '../layout/tabArea/TopButtons';
import Contents from '../layout/tabArea/Contents';
import FileUploader from '../feature/FileUploader';
import Images from './Images';
import Button from '../common/Button';
import SVG from '../common/SVG';

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
`;

const ImagesContainer = () => {
  //console.log('ImagesContainer');
  const dispatch = useDispatch();

  // 선택 이미지 리스트 관리
  const [selectedList, setSelectedList] = useState([]);
  const onToggle = id => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter(item => item !== id));
      dispatch(deleteSelectedParticle(id));
    } else {
      setSelectedList(selectedList.concat(id));
      dispatch(addSelectedParticle(id));
    }
  };

  const onDelete = () => {
    setSelectedList([]);
    dispatch(clearSelectedParticle());
    dispatch(deleteParticle(selectedList));
  };

  const onCrop = () => {
    if (!selectedList.length) {
      alert('⚠ 이미지를 선택해주세요 ⚠');
      return;
    }
    if (selectedList.length > 1) {
      alert('⚠ 이미지 크롭은 한 번에 하나만 가능합니다 ⚠');
      setSelectedList([]);
      dispatch(clearSelectedParticle());
      dispatch(deleteSelectedCrop());
      return;
    }
    dispatch(addSelectedCrop(selectedList[0]));
  };

  return (
    <>
      <TopButtons>
        <ButtonInner>
          <FileUploader />
          <Button padding="5px" margin="0 5px 0 0" onClick={onDelete}>
            <SVG
              width="15"
              height="15"
              path="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"
            />
          </Button>
        </ButtonInner>
        <ButtonInner>
          <Button padding="5px" margin="0 5px 0 0" onClick={onCrop}>
            <SVG
              width="15"
              height="15"
              path="M24 18h-4v-14h-14v-4h-2v4h-4v2h4v14h14v4h2v-4h4v-2zm-18 0v-12h12v12h-12z"
            />
          </Button>
        </ButtonInner>
      </TopButtons>
      <Contents>
        <Images selectedList={selectedList} onToggle={onToggle} />
      </Contents>
    </>
  );
};

export default ImagesContainer;
