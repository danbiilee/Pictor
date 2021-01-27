import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Block = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 100%;
  padding: 3px;
  background: var(--darkest-gray);
  border: 2px solid var(--border-dark-gray);
  color: var(--lightest-gray);
`;

const Input = ({ onChange, ...props }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <Block onChange={onChange} ref={inputRef} {...props} />;
};

export default React.memo(Input);
