import React, { useState, useCallback } from 'react';

import TabPanel from '../layout/tabPanel';
import ImagesContainer from './ImagesContainer';
import PatternsContainer from './PatternsContainer';
import CanvasContainer from './CanvasContainer';

const TabPanelContainer = ({ target }) => {
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
    <TabPanel
      target={target}
      tabs={tabs}
      activeTab={activeTab}
      handleTab={handleTab}
    >
      {tabCompObj[activeTab]}
    </TabPanel>
  );
};

export default React.memo(TabPanelContainer);
