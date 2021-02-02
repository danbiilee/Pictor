import React from 'react';
import styled from 'styled-components';

import SVG from '../../common/SVG';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const ColorInput = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 50px;
  height: 55px;
  cursor: pointer;
`;

const SetColor = ({ selected, handleSelected, color, onChange }) => {
  //const dispatch = useDispatch();

  return (
    <ToggleWrapper>
      <ToggleTitle
        selected={selected}
        type="color"
        handleSelected={handleSelected}
      >
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Background Color
      </ToggleTitle>
      <ToggleContent selected={selected === 'color'}>
        <ColorInput
          type="color"
          name="color"
          value={color}
          onChange={onChange}
        />
        {color}
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetColor;
