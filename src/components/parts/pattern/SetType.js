import React from 'react';
import SVG from '../../common/SVG';
import Input from '../../common/Input';
import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetType = ({ ...props }) => {
  const { selected, handleSelected, type, onChange } = props;
  return (
    <ToggleWrapper>
      <ToggleTitle
        selected={selected}
        type="patternType"
        handleSelected={handleSelected}
      >
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Select Pattern
        Type
      </ToggleTitle>
      <ToggleContent selected={selected === 'patternType'}>
        {type}
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetType;
