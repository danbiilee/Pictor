import * as React from 'react';
import styled from 'styled-components';

const Block = styled.svg`
  margin: ${props => props.margin};
`;

const SVG = ({ path, ...props }) => {
  return (
    <Block xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d={path} fillRule="evenodd" clipRule="evenodd" />
    </Block>
  );
};

export default React.memo(SVG);
