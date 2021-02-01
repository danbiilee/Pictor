import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1 0 50vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Content;
