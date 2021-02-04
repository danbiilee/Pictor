import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
        <Button padding="5px" margin="0 5px 0 0" onClick={onReset} aria-label="설정 초기화">
          <SVG
            width="15"
            height="15"
            path="M2.458 9.012c-.297.947-.458 1.955-.458 3 0 5.52 4.481 10 10 10 5.52 0 10-4.48 10-10 0-5.519-4.48-10-10-10-2.121 0-4.083.668-5.703 1.796l1.703 2.204h-6.58l1.935-6.012 1.718 2.223c1.958-1.389 4.346-2.211 6.927-2.211 6.623 0 12 5.377 12 12s-5.377 11.988-12 11.988-12-5.365-12-11.988c0-1.036.132-2.041.379-3h2.079zm10.35-3.012c.292.821.375 1.346 1.01 1.609.637.264 1.073-.052 1.854-.423l1.142 1.142c-.373.787-.687 1.218-.423 1.854.262.634.784.716 1.609 1.009v1.617c-.816.29-1.347.375-1.61 1.01-.264.636.052 1.071.424 1.853l-1.142 1.142c-.79-.375-1.219-.687-1.85-.424-.639.265-.723.793-1.014 1.611h-1.616c-.292-.821-.375-1.347-1.01-1.61-.637-.264-1.072.052-1.854.423l-1.142-1.142c.366-.771.689-1.212.423-1.854-.263-.635-.793-.719-1.609-1.009v-1.617c.817-.29 1.346-.373 1.609-1.009.264-.637-.051-1.07-.423-1.854l1.142-1.142c.788.374 1.218.687 1.854.423.635-.263.719-.792 1.01-1.609h1.616zm-.808 8c-1.105 0-2-.896-2-2 0-1.105.895-2.001 2-2.001 1.104 0 2 .896 2 2.001 0 1.104-.896 2-2 2z"
          />
        </Button>
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
