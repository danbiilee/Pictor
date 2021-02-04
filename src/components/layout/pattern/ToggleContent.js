import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: ${props => (props.selected ? 'flex' : 'none')};
  ${props =>
    props.column &&
    css`
      flex-direction: column;
    `}
  align-items: center;
  padding: 5px;
`;

const ToggleContent = ({ children, ...props }) => {
  return <Wrapper {...props}>{children}</Wrapper>;
};

export default ToggleContent;
