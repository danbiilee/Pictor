import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  // flex: 1 1 500px;
  // overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Contents = ({ children }) => {
  //console.log('Contents');
  return <Wrapper>{children}</Wrapper>;
};

export default Contents;
