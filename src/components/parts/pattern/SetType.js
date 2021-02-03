import React from 'react';

import SVG from '../../common/SVG';
import Select from '../../common/Select';

import ToggleWrapper from '../../layout/pattern/ToggleWrapper';
import ToggleTitle from '../../layout/pattern/ToggleTitle';
import ToggleContent from '../../layout/pattern/ToggleContent';

const SetType = ({ ...props }) => {
  const { selected, handleSelected, type, onChange } = props;
  const typeList = [
    {
      type: 'vanilla',
      optionName: 'vanilla',
    },
    {
      type: 'fold',
      optionName: 'fold',
    },
    {
      type: 'flip',
      optionName: 'flip',
    },
    {
      type: 'linefold',
      optionName: 'linefold',
    },
    {
      type: 'lineflip',
      optionName: 'lineflip',
    },
    {
      type: 'vanilla-zigzag',
      optionName: 'vanilla-zigzag',
    },
    {
      type: 'fold-zigzag',
      optionName: 'fold-zigzag',
    },
    {
      type: 'flip-zigzag',
      optionName: 'flip-zigzag',
    },
    {
      type: 'linefold-zigzag',
      optionName: 'linefold-zigzag',
    },
    {
      type: 'lineflip-zigzag',
      optionName: 'lineflip-zigzag',
    },
  ];

  return (
    <ToggleWrapper>
      <ToggleTitle selected={selected} type="patternType" handleSelected={handleSelected}>
        <SVG width="10" height="10" path="M12 21l-12-18h24z" /> Select Pattern Type
      </ToggleTitle>
      <ToggleContent selected={selected === 'patternType'}>
        <Select data={typeList} onChange={onChange} />
      </ToggleContent>
    </ToggleWrapper>
  );
};

export default SetType;