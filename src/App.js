import React from 'react';
import styled from 'styled-components';
import TabAreaContainer from './components/layout/TabAreaContainer';

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
      <h1>Pictor</h1>
      <Wrapper>
        <TabAreaContainer target="SIDEBAR" />
        <TabAreaContainer target="CANVAS" />
      </Wrapper>
    </Main>
  );
};

export default App;
