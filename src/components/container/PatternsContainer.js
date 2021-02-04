import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeProperties, initialData } from '../../redux/pictures';

import SVG from '../common/SVG';
import Button from '../common/Button';
import TopButtons from '../layout/tabPanel/TopButtons';
import Content from '../layout/tabPanel/Content';

import SetImage from '../parts/pattern/SetImage';
import SetColor from '../parts/pattern/SetColor';
import SetCVSize from '../parts/pattern/SetCVSize';
import SetImgSize from '../parts/pattern/SetImgSize';
import SetGapSize from '../parts/pattern/SetGapSize';
import SetType from '../parts/pattern/SetType';
import FileUploader from '../common/FileUploader';

const ButtonInner = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsContainer = () => {
  const dispatch = useDispatch();
  const { properties: prop } = useSelector(state => state.pictures);

  // 속성 설정
  const defaultProps = initialData.properties;
  const [properties, setProperties] = useState(prop);
  //console.log('SettingsContainer', defaultProps, properties);

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    setProperties(properties => ({
      ...properties,
      [name]: value,
    }));
  }, []);
  const onReset = useCallback(() => setProperties(defaultProps), []);

  // 설정값 변경되면 패턴 다시 그림
  useEffect(() => {
    dispatch(changeProperties(properties));
  }, [properties, dispatch]);

  // 설정영역 토글: color, canvasSize, img, imgSize, gap, patternType
  const [selected, setSelected] = useState('color');
  const handleSelected = useCallback(
    prop => {
      if (selected === prop) {
        setSelected(null);
      } else {
        setSelected(prop);
      }
    },
    [selected],
  );

  return (
    <>
      <TopButtons>
        <ButtonInner>
          <FileUploader />
        </ButtonInner>
        <ButtonInner>
          <Button padding="5px" margin="0 5px 0 0" onClick={onReset} aria-label="설정 초기화">
            <SVG
              width="15"
              height="15"
              path="M18.885 3.515c-4.617-4.618-12.056-4.676-16.756-.195l-2.129-2.258v7.938h7.484l-2.066-2.191c2.82-2.706 7.297-2.676 10.073.1 4.341 4.341 1.737 12.291-5.491 12.291v4.8c3.708 0 6.614-1.244 8.885-3.515 4.686-4.686 4.686-12.284 0-16.97z"
            />
          </Button>
        </ButtonInner>
      </TopButtons>
      <Content>
        <SetColor
          selected={selected}
          handleSelected={handleSelected}
          setProperties={setProperties}
          onChange={onChange}
        />
        <SetCVSize
          selected={selected}
          handleSelected={handleSelected}
          setProperties={setProperties}
        />
        <SetImage selected={selected} handleSelected={handleSelected} />
        <SetImgSize selected={selected} handleSelected={handleSelected} onChange={onChange} />
        <SetGapSize selected={selected} handleSelected={handleSelected} onChange={onChange} />
        <SetType selected={selected} handleSelected={handleSelected} onChange={onChange} />
      </Content>
    </>
  );
};

export default React.memo(SettingsContainer);
