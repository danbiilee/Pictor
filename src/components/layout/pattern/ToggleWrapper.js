import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 5px;
`;

const ToggleWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ToggleWrapper;
