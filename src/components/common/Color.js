import React, { useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';

const Block = styled.input.attrs(props => ({
  type: props.type,
}))`
  width: 40px;
  height: 30px;
`;

const Input = ({ onChange, ...props }) => {
  const { setProperties } = props;
  // useState의 경우 매번 컴포넌트가 리렌더되서, 디바운스 적용 안됨
  const color = useRef(props.value);

  const debounceChange = debounce(() => {
    setProperties(properties => ({
      ...properties,
      color: color.current,
    }));
  }, 100);

  const handleChange = e => {
    color.current = e.target.value;
    debounceChange();
  };

  return <Block type="color" {...props} onChange={handleChange} />;
};

export default React.memo(Input);
