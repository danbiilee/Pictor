import React from 'react';

import Main from './components/layout/Main';
import TabPanelContainer from './components/container/TabPanelContainer';

const App = () => {
  return (
    <Main>
      <TabPanelContainer target="SIDEBAR" />
      <TabPanelContainer target="CANVAS" />
    </Main>
  );
};

export default App;
