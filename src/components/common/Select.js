import React from 'react';
import styled from 'styled-components';

const SelectBlock = styled.select`
  min-width: 90%;
  padding: 3px;
  background: var(--darkest-gray);
  border: 2px solid var(--border-dark-gray);
  color: var(--lightest-gray);
`;
const Option = styled.option`
  color: var(--lightest-gray);
`;

const Select = ({ data, onChange }) => {
  return (
    <SelectBlock name="type" onChange={onChange}>
      {data &&
        data.map(d => (
          <Option key={d.type} value={d.type}>
            {d.optionName}
          </Option>
        ))}
    </SelectBlock>
  );
};

export default Select;
