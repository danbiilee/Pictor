import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPicture } from '../../redux/pictures';
import styled from 'styled-components';

import SVG from './SVG';

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
  const { canvasMode } = useSelector(state => state.pictures);
  const type = canvasMode === 'pattern' ? 'crop' : 'origin';
  const fileRef = useRef();
  const dispatch = useDispatch();

  const resizeImgae = (width, height) => {
    // 이미지 리사이즈
    const MAX_WIDTH = 300;
    const MAX_HEIGHT = 300;
    if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
      return { width, height };
    }

    if (width > height) {
      // landscape
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      // portrait
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    return { width, height };
  };

  const getResizedSrc = (img, w, h) => {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    c.width = w;
    c.height = h;
    ctx.drawImage(img, 0, 0, w, h);
    return c.toDataURL('image/png', 1);
  };

  const handelFile = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener('load', () => {
      let src = reader.result;
      if (canvasMode !== 'pattern') {
        dispatch(addPicture({ type, src })); // indexedDB에 저장
        return;
      }

      // 크롭 사이즈로 src 재생성 후 저장
      const img = new Image();
      img.onload = function () {
        const { width, height } = resizeImgae(img.width, img.height);
        src = getResizedSrc(this, width, height);
        dispatch(addPicture({ type, src }));
      };
      img.src = src;
    });
    //fileRef.current.value = '';
  };

  return (
    <Label htmlFor="file" aria-label="업로드">
      <FileInput type="file" id="file" name="file" onChange={handelFile} ref={fileRef} />
      <SVG
        width="15"
        height="15"
        path="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
      />
    </Label>
  );
};

export default React.memo(FileUploader);
