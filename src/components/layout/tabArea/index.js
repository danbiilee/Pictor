import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.tabTitle === 'IMAGES' ? '0 1 20vw' : '1 1 auto')};
  padding: 5px;
`;

const Tab = styled.h3`
  width: fit-content;
  padding: 5px;
  background: var(--middle-gray);
  border: 2px solid var(--border-dark-gray);
  border-bottom: 0;
  font-size: 0.9rem;
  font-weight: normal;
`;

const Area = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: var(--middle-gray);
  border: 2px solid var(--border-dark-gray);
`;

const TabArea = ({ title, children }) => {
  //console.log('TabArea');
  return (
    <Wrapper tabTitle={title}>
      <Tab>{title}</Tab>
      <Area>{children}</Area>
    </Wrapper>
  );
};

export default TabArea;
