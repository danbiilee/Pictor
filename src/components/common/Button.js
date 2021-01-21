import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  background-color: var(--middle-gray);
  color: var(--lightest-gray);
  &:hover {
    background-color: var(--dark-gray);
    transition: 0.2s ease-in-out;
  }
  svg {
    fill: var(--lightest-gray);
  }
`;

const Button = ({ children, onClick, ...props }) => {
  return (
    <Wrapper {...props} onClick={onClick}>
      {children}
    </Wrapper>
  );
};

export default React.memo(Button);
