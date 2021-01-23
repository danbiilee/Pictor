import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addParticle } from '../../redux/particles';
import styled from 'styled-components';

import SVG from '../common/SVG';

const FileInput = styled.input.attrs(props => ({
  type: 'file',
}))`
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
`;

const Label = styled.label`
  padding: 5px;
  margin-right: 3px;
  &:hover {
    background-color: var(--dark-gray);
    transition: 0.2s ease-in-out;
  }
  cursor: pointer;
  svg {
    fill: var(--lightest-gray);
  }
`;

const FileUploader = () => {
  //console.log('FileUploader');

  const fileRef = useRef();
  const dispatch = useDispatch();

  const handelFile = e => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', () =>
      dispatch(addParticle({ type: 'origin', src: reader.result })),
    ); // 바로 indexedDB에 저장
    fileRef.current.value = '';
  };

  return (
    <Label htmlFor="file">
      <FileInput
        type="file"
        id="file"
        name="file"
        onChange={handelFile}
        ref={fileRef}
      />
      <SVG
        width="15"
        height="15"
        path="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
      />
    </Label>
  );
};

export default React.memo(FileUploader);
