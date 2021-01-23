import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 5px;
`;

const TopFilter = ({ children }) => {
  //console.log('TopFilter');
  return <Wrapper>{children}</Wrapper>;
};

export default React.memo(TopFilter);
