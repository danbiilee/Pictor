import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Color from '../../common/Color';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const ColorCode = styled.div`
  margin-left: 5px;
  color: ${props => props.color};
  font-size: 0.8rem;
`;

const SetColor = ({ ...props }) => {
  const { selected, handleSelected, onChange, setProperties } = props;
  const { color } = useSelector(state => state.pictures.properties);

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="color" handleSelected={handleSelected}>
        Background Color
      </ToggleTitle>
      <ToggleContent selected={selected === 'color'}>
        <Color name="color" value={color} onChange={onChange} setProperties={setProperties} />
        <ColorCode color={color}>{color}</ColorCode>
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetColor;
