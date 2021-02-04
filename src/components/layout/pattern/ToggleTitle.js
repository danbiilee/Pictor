import React from 'react';
import styled from 'styled-components';
import SVG from '../../common/SVG';

const Wrapper = styled.button`
  justify-content: flex-start;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  background-color: ${props => (props.selected ? 'var(--dark-gray)' : 'var(--middle-gray)')};
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
  const isSelected = selected === type;
  return (
    <Wrapper selected={isSelected} onClick={() => handleSelected(type)}>
      {isSelected ? (
        <SVG width="10" height="10" path="M12 21l-12-18h24z" />
      ) : (
        <SVG width="10" height="10" path="M24 22h-24l12-20z" />
      )}
      {children}
    </Wrapper>
  );
};

export default ToggleTitle;
