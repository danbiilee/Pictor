import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { changeCanvasMode, changeDrawnPicture, clearSelectedPictures } from '../../redux/pictures';

import TabPanel from '../layout/tabPanel';
import ImagesContainer from './ImagesContainer';
import PatternsContainer from './PatternsContainer';
import CanvasContainer from './CanvasContainer';

const TabPanelContainer = ({ target }) => {
  const dispatch = useDispatch();
  const tabs = target === 'SIDEBAR' ? ['IMAGES', 'PATTERN'] : ['CANVAS'];
  const tabCompObj =
    target === 'SIDEBAR'
      ? {
          0: <ImagesContainer />,
          1: <PatternsContainer />,
        }
      : { 0: <CanvasContainer /> };

  const [activeTab, setActiveTab] = useState(0);
  const handleTab = useCallback(id => {
    setActiveTab(id);
    // 초기화
    dispatch(clearSelectedPictures());
    dispatch(changeDrawnPicture(null));
    switch (id) {
      case 0: //IMAGES
        dispatch(changeCanvasMode(null));
        break;
      case 1:
        dispatch(changeCanvasMode('pattern'));
        break;
    }
  }, []);

  return (
    <TabPanel target={target} tabs={tabs} activeTab={activeTab} handleTab={handleTab}>
      {tabCompObj[activeTab]}
    </TabPanel>
  );
};

export default React.memo(TabPanelContainer);
