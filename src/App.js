import React from 'react';
import styled from 'styled-components';

import TabArea from './components/layout/tabArea';
import ImagesContainer from './components/container/ImagesContainer';
import CanvasContainer from './components/container/CanvasContainer';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  h1 {
    padding: 5px;
    background-color: var(--darkest-gray);
    color: #fff;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: var(--dark-gray);
`;

const App = () => {
  //console.log('App');
  return (
    <Main>
      <h1>PARTICLE MAKER</h1>
      <Wrapper>
        <TabArea title="IMAGES">
          <ImagesContainer />
        </TabArea>
        <TabArea title="CANVAS">
          <CanvasContainer />
        </TabArea>
      </Wrapper>
    </Main>
  );
};

export default App;
