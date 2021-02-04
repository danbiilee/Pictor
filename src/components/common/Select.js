import React, { useRef, useEffect } from 'react';
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
  const selectRef = useRef();
  const handleFocus = () => {
    selectRef.current.size = 5;
  };
  const handleBlur = () => {
    selectRef.current.size = 1;
  };
  const handleChange = () => {
    selectRef.current.blur();
  };
  useEffect(() => {
    const select = selectRef.current;
    if (select && data.length > 5) {
      select.addEventListener('focus', handleFocus);
      select.addEventListener('blur', handleBlur);
      select.addEventListener('change', handleChange);
    }
    return () => {
      select.removeEventListener('focus', handleFocus);
      select.removeEventListener('blur', handleBlur);
      select.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <SelectBlock name="type" onChange={onChange} ref={selectRef}>
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
