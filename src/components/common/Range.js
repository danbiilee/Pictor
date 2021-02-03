import React from 'react';
import styled from 'styled-components';

const RangeInput = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 100%;
  padding: 3px;
  background: var(--darkest-gray);
  border: 2px solid var(--border-dark-gray);
  color: var(--lightest-gray);
`;

const Range = ({ onChange, ...props }) => {
  return <RangeInput type="range" {...props} onChange={onChange} />;
};

export default React.memo(Range);
