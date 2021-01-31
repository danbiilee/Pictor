import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeCanvasMode,
  changeProperties,
  changeDrawnPicture,
} from '../../redux/pictures';

import Images from '../parts/Images';
import TopButtons from '../parts/tabPanel/TopButtons';
import Contents from '../parts/tabPanel/Contents';
import Button from '../common/Button';
import SVG from '../common/SVG';
import Input from '../common/Input';
import Select from '../common/Select';

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
`;

const ContentsInner = styled.div`
  padding: 5px;
`;

const Settings = styled.div`
  padding: 5px;
  border-bottom: 2px double var(--border-dark-gray);
`;
const InnerBlock = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  &:not(:first-of-typ) {
    margin-top: 5px;
  }
`;
const ToggleTitle = styled.button`
  justify-content: flex-start;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props =>
    props.selected ? 'var(--dark-gray)' : 'var(--middle-gray)'};
  &:hover {
    background-color: var(--dark-gray);
    transition: 0.2s;
  }
  color: var(--lightest-gray);
  font-size: 0.8rem;
  svg {
    margin-right: 3px;
    fill: var(--lightest-gray);
  }
  cursor: pointer;
`;
const ToggleContents = styled.div`
  display: ${props => (props.selected ? 'flex' : 'none')};
  flex-direction: column;
`;

const ColorInput = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 50px;
  height: 55px;
  cursor: pointer;
`;

const SettingsContainer = () => {
  const dispatch = useDispatch();
  const { properties: prop, canvasMode, drawnPicture } = useSelector(
    state => state.pictures,
  );

  // 속성값 설정
  const [properties, setProperties] = useState(prop);
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setProperties(properties => ({
      ...properties,
      [name]: value,
    }));
  }, []);
  const onReset = useCallback(
    () =>
      setProperties({
        color: '#ffffff',
        canvasWidth: 0,
        canvasHeight: 0,
        imgWidth: 0,
        imgHeight: 0,
        gap: 50,
        type: 'vanilla',
      }),
    [],
  );

  const keys = useRef([]);
  // 설정값 변경되면 패턴 다시 그림
  useEffect(() => {
    for (let key in properties) {
      if (properties[key] !== prop[key]) keys.current.push(key);
    }
    if (!keys.current.length) {
      console.log('keys.length 0');
      return;
    }
    // 배경사이즈 적용은 width, height 둘 다 입력했을 때만
    const canvasSize =
      keys.current.includes('canvasWidth') &&
      keys.current.includes('canvasWidth');
    const imgSize =
      keys.current.includes('imgWidth') && keys.current.includes('imgWidth');
    console.log('properties changed', keys.current, properties);
    dispatch(changeProperties(properties));
  }, [properties, dispatch]);

  const handleSizeProp = () => {
    dispatch(changeProperties(properties));
  };

  // 설정영역 토글
  // img, canvasSize, color, imgSize, gap, patternType
  const [selectedArea, setSelectedArea] = useState('img');
  const handleSelectedArea = useCallback(prop => setSelectedArea(prop), []);

  // 선택 크롭 이미지 관리
  const [selectedCrop, setSelectedCrop] = useState([]);
  const onToggle = useCallback(
    id => {
      if (!selectedCrop.includes(id)) {
        setSelectedCrop(selectedCrop => [id]);
        dispatch(changeDrawnPicture(id));
      }
      // 이미지 선택되면 패턴 그림
      dispatch(changeCanvasMode('pattern'));
    },
    [dispatch],
  );

  // 그림 선택되면 캔버스에 그림
  // useEffect(() => {
  //   if (drawnPicture) {
  //     console.log('drawnPicture changed', drawnPicture);
  //     dispatch(changeCanvasMode('pattern'));
  //   }
  // }, [drawnPicture, dispatch]);

  const patternType = [
    {
      type: '',
      optionName: '전체',
    },
  ];

  const makePattern = useCallback(() => {
    dispatch(changeCanvasMode('pattern'));
    dispatch(changeProperties(properties));
  }, [properties, dispatch]);

  return (
    <>
      <TopButtons>
        <ButtonInner>
          {/* 설정 초기화 */}
          <Button padding="5px" margin="0 5px 0 0" onClick={onReset}>
            <SVG
              width="15"
              height="15"
              path="M2.458 9.012c-.297.947-.458 1.955-.458 3 0 5.52 4.481 10 10 10 5.52 0 10-4.48 10-10 0-5.519-4.48-10-10-10-2.121 0-4.083.668-5.703 1.796l1.703 2.204h-6.58l1.935-6.012 1.718 2.223c1.958-1.389 4.346-2.211 6.927-2.211 6.623 0 12 5.377 12 12s-5.377 11.988-12 11.988-12-5.365-12-11.988c0-1.036.132-2.041.379-3h2.079zm10.35-3.012c.292.821.375 1.346 1.01 1.609.637.264 1.073-.052 1.854-.423l1.142 1.142c-.373.787-.687 1.218-.423 1.854.262.634.784.716 1.609 1.009v1.617c-.816.29-1.347.375-1.61 1.01-.264.636.052 1.071.424 1.853l-1.142 1.142c-.79-.375-1.219-.687-1.85-.424-.639.265-.723.793-1.014 1.611h-1.616c-.292-.821-.375-1.347-1.01-1.61-.637-.264-1.072.052-1.854.423l-1.142-1.142c.366-.771.689-1.212.423-1.854-.263-.635-.793-.719-1.609-1.009v-1.617c.817-.29 1.346-.373 1.609-1.009.264-.637-.051-1.07-.423-1.854l1.142-1.142c.788.374 1.218.687 1.854.423.635-.263.719-.792 1.01-1.609h1.616zm-.808 8c-1.105 0-2-.896-2-2 0-1.105.895-2.001 2-2.001 1.104 0 2 .896 2 2.001 0 1.104-.896 2-2 2z"
            />
          </Button>
          {/* 패턴 저장 */}
          <Button padding="5px" margin="0 5px 0 0">
            <SVG
              width="15"
              height="15"
              path="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"
            />
          </Button>
        </ButtonInner>
      </TopButtons>
      <Contents>
        <ContentsInner>
          <Settings>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'img'}
                onClick={() => handleSelectedArea('img')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Select
                Image
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'img'}>
                <Images
                  selectedType="crop"
                  selectedList={selectedCrop}
                  onToggle={onToggle}
                />
              </ToggleContents>
            </InnerBlock>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'color'}
                onClick={() => handleSelectedArea('color')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" />{' '}
                Background Color
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'color'}>
                <ColorInput
                  type="color"
                  name="color"
                  value={properties.color}
                  onChange={onChange}
                />{' '}
                {properties.color}
              </ToggleContents>
            </InnerBlock>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'canvasSize'}
                onClick={() => handleSelectedArea('canvasSize')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" />{' '}
                Background Size
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'canvasSize'}>
                W:{' '}
                <Input
                  type="number"
                  name="canvasWidth"
                  value={properties.canvasWidth}
                  onChange={onChange}
                />
                H:{' '}
                <Input
                  type="number"
                  name="canvasHeight"
                  value={properties.canvasHeight}
                  onChange={onChange}
                />
                {/* 사이즈 적용 버튼 */}
                <Button
                  padding="5px"
                  margin="0 5px 0 0"
                  onClick={handleSizeProp}
                >
                  <SVG
                    width="15"
                    height="15"
                    path="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"
                  />
                </Button>
              </ToggleContents>
            </InnerBlock>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'imgSize'}
                onClick={() => handleSelectedArea('imgSize')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Set
                Cropped Image Size
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'imgSize'}>
                W:{' '}
                <Input
                  type="number"
                  name="imgWidth"
                  value={properties.imgWidth}
                  onChange={onChange}
                />
                H:{' '}
                <Input
                  type="number"
                  name="imgHeight"
                  value={properties.imgHeight}
                  onChange={onChange}
                />
              </ToggleContents>
            </InnerBlock>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'gap'}
                onClick={() => handleSelectedArea('gap')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Set Gap
                Size
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'gap'}>
                <Input
                  type="number"
                  name="gap"
                  value={properties.gap}
                  onChange={onChange}
                />
              </ToggleContents>
            </InnerBlock>
            <InnerBlock>
              <ToggleTitle
                selected={selectedArea === 'patternType'}
                onClick={() => handleSelectedArea('patternType')}
              >
                <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Select
                Pattern Type
              </ToggleTitle>
              <ToggleContents selected={selectedArea === 'patternType'}>
                {prop.type}
              </ToggleContents>
            </InnerBlock>
          </Settings>
        </ContentsInner>
      </Contents>
    </>
  );
};

export default React.memo(SettingsContainer);
