import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Tabs from './Tabs';
import ImagesContainer from '../container/ImagesContainer';
import PatternsContainer from '../container/PatternsContainer';
import CanvasContainer from '../container/CanvasContainer';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.target === 'SIDEBAR' ? '0 1 20vw' : '1 1 auto')};
  padding: 5px;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  background: var(--middle-gray);
  border: 2px solid var(--border-dark-gray);
`;

const TabArea = ({ target }) => {
  const { drawnPicture } = useSelector(state => state.pictures);
  const tabs = target === 'SIDEBAR' ? ['IMAGES', 'PATTERN'] : ['CANVAS'];
  const tabCompObj =
    target === 'SIDEBAR'
      ? {
          0: <ImagesContainer />,
          1: <PatternsContainer />,
        }
      : { 0: <CanvasContainer /> };

  const [activeTab, setActiveTab] = useState(0);
  const handleTab = useCallback(id => setActiveTab(id), []);

  return (
    <Wrapper target={target}>
      <Tabs tabs={tabs} activeTab={activeTab} handleTab={handleTab} />
      <ContentsWrapper>{tabCompObj[activeTab]}</ContentsWrapper>
    </Wrapper>
  );
};

export default React.memo(TabArea);
