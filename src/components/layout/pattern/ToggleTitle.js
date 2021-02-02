import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  justify-content: flex-start;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props =>
    props.selected ? 'var(--dark-gray)' : 'var(--middle-gray)'};
  &:hover {
    background-color: var(--dark-gray);
    transition: 0.2s;
  }
  color: var(--lightest-gray);
  font-size: 0.8rem;
  svg {
    margin-right: 3px;
    fill: var(--lightest-gray);
  }
  cursor: pointer;
`;

const ToggleTitle = ({ selected, type, handleSelected, children }) => {
  return (
    <Wrapper selected={selected === type} onClick={() => handleSelected(type)}>
      {children}
    </Wrapper>
  );
};

export default ToggleTitle;
