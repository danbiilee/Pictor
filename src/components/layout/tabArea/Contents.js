import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex: 1 1 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--border-light-gray);
  }
  &::-webkit-scrollbar-track {
    background-color: var(--dark-gray);
  }
`;

const Contents = ({ children }) => {
  //console.log('Contents');
  return <Wrapper>{children}</Wrapper>;
};

export default Contents;
