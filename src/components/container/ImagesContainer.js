import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPictures,
  deletePicture,
  addSelectedPictures,
  deleteSelectedPictures,
  clearSelectedPictures,
  changeDrawnPicture,
  changeCanvasMode,
} from '../../redux/pictures';
import styled from 'styled-components';

import TopButtons from '../parts/tabPanel/TopButtons';
import TopFilter from '../parts/tabPanel/TopFilter';
import Contents from '../parts/tabPanel/Contents';
import FileUploader from '../common/FileUploader';
import Images from '../parts/Images';
import Button from '../common/Button';
import SVG from '../common/SVG';
import Select from '../common/Select';

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
`;

const addTypeList = (pictures, typeList) => {
  if (!pictures || !pictures.length) {
    return typeList;
  }

  for (let pic of pictures) {
    // canvasMode: origin, crop, pattern
    let optionName = '';
    if (pic.type === 'crop') optionName = '크롭';
    else if (pic.type === 'pattern') optionName = '패턴';
    else optionName = '원본';

    if (!typeList.find(t => t.type === pic.type)) {
      typeList.push({ type: pic.type, optionName });
    }
  }
  return typeList;
};

const ImagesContainer = () => {
  const dispatch = useDispatch();
  const { pictures, drawnPicture } = useSelector(state => state.pictures);

  // 이미지 type으로 필터링하기 위한 배열
  let typeList = [
    {
      type: 'all',
      optionName: '전체',
    },
  ];
  // pictures가 바뀌었을 때만 실행
  typeList = useMemo(() => addTypeList(pictures, typeList), [pictures]);

  //console.log('ImagesContainer', pictures, typeList);

  // 첫 마운트 후 indexedDB 값 리덕스 스토어에 셋팅
  useEffect(() => {
    if (!pictures || !pictures.length) {
      dispatch(getPictures());
    }
  }, []);

  // 필터링 type 값 관리
  const [selectedType, setSelectedType] = useState(typeList[0].type);
  const onChange = e => setSelectedType(e.target.value);

  // 선택 이미지 리스트(삭제용) 관리
  const [selectedList, setSelectedList] = useState([]);
  const onToggle = id => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter(item => item !== id));
      dispatch(deleteSelectedPictures(id));
    } else {
      setSelectedList(selectedList.concat(id));
      dispatch(addSelectedPictures(id));
    }
    dispatch(changeDrawnPicture(id));
    dispatch(changeCanvasMode(null));
  };

  const onDelete = () => {
    dispatch(deletePicture(selectedList));
    dispatch(clearSelectedPictures());

    // 캔버스에서도 삭제
    if (selectedList.includes(drawnPicture)) {
      dispatch(changeDrawnPicture(null));
      dispatch(changeCanvasMode('clear'));
    }
    setSelectedList([]);
  };

  const onCrop = () => {
    if (!drawnPicture) {
      alert('⚠ 이미지를 선택해주세요 ⚠');
      return;
    }
    dispatch(changeCanvasMode('crop'));
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
      <TopFilter>
        <Select data={typeList} onChange={onChange} />
      </TopFilter>
      <Contents>
        <Images
          selectedType={selectedType}
          selectedList={selectedList}
          onToggle={onToggle}
        />
      </Contents>
    </>
  );
};

export default React.memo(ImagesContainer);
