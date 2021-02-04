import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.flex ? props.flex : 'space-between')};
  align-items: center;
  padding: 5px;
  border-bottom: 2px solid var(--border-light-gray);
`;

const TopButtons = ({ flex, children }) => {
  //console.log('TopButtons');
  return <Wrapper flex={flex}>{children}</Wrapper>;
};

export default TopButtons;
