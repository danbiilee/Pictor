import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 2px solid var(--border-light-gray);
`;

const TopButtons = ({ children }) => {
  //console.log('TopButtons');
  return <Wrapper>{children}</Wrapper>;
};

export default TopButtons;
