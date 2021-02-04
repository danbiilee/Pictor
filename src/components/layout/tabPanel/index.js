import React from 'react';
import styled from 'styled-components';

import Tabs from './Tabs';

const Wrapper = styled.div`
  flex-basis: ${props => (props.target === 'SIDEBAR' ? '20vw' : '80vw')};
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 5px;
  padding-top: 36px;
  &:last-of-type {
    padding-left: 0;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background: var(--middle-gray);
  border: 2px solid var(--border-dark-gray);
`;

const TabPanel = ({ children, ...props }) => {
  const { target, tabs, activeTab, handleTab } = props;
  //console.log('TabPanel layout ', target, tabs);
  return (
    <Wrapper target={target}>
      <Tabs tabs={tabs} activeTab={activeTab} handleTab={handleTab} />
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  );
};

export default TabPanel;
