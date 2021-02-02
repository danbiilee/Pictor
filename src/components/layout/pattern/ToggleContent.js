import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${props => (props.selected ? 'flex' : 'none')};
  flex-direction: column;
`;

const ToggleContent = ({ selected, children }) => {
  return <Wrapper selected={selected}>{children}</Wrapper>;
};

export default ToggleContent;
