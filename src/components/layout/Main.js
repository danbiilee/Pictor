import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 31px;
  h1 {
    padding: 5px 5px 5px 10px;
    background-color: var(--darkest-gray);
    color: #fff;
    font-family: 'Lobster', cursive;
    font-size: 1.2rem;
  }
`;

const MainContents = styled.section`
  display: flex;
  height: 100vh;
  background-color: var(--dark-gray);
`;

const Main = ({ children }) => {
  return (
    <MainWrapper>
      <Header>
        <h1>Pictor</h1>
      </Header>
      <MainContents>{children}</MainContents>
    </MainWrapper>
  );
};

export default Main;
