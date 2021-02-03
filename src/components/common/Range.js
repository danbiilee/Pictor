import React from 'react';
import styled from 'styled-components';

const RangeInput = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 100%;
  padding: 3px;
  background: transparent;
  -webkit-appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 13px;
    height: 18px;
    margin-top: -5px;
    background: var(--middle-gray);
    border: 2px solid var(--dark-gray);
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background: var(--dark-gray);
      border: 0;
    }
  }
  &::-webkit-slider-runnable-track {
    height: 8px;
    background: var(--border-light-gray);
  }
`;

const Range = ({ onChange, ...props }) => {
  return <RangeInput type="range" {...props} onChange={onChange} />;
};

export default React.memo(Range);
