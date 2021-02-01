import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDrawnPicture,
  changeCanvasMode,
  addPicture,
} from '../../redux/pictures';

import TopButtons from '../layout/tabPanel/TopButtons';
import Content from '../layout/tabPanel/Content';
import Button from '../common/Button';
import Canvas from '../parts/Canvas';

const CanvasContainer = () => {
  //console.log('CanvasContainer');
  const dispatch = useDispatch();
  const { canvasMode } = useSelector(state => state.pictures);
  const [myCanvas, setMyCanvas] = useState(null);

  const onClear = () => {
    dispatch(changeDrawnPicture(null));
    dispatch(changeCanvasMode('clear'));
    //setActiveTarget('clear');
  };

  const onSave = () => {
    const payload = {
      type: canvasMode,
      src: myCanvas.drawnImgSrc,
    };
    if (myCanvas.drawnImgTitle) {
      payload.title = myCanvas.drawnImgTitle;
    }
    dispatch(addPicture(payload));
  };

  return (
    <>
      <TopButtons>
        <Button padding="5px" margin="0 5px 0 0" onClick={onSave}>
          SAVE
        </Button>
        <Button padding="5px" margin="0 5px 0 0" onClick={onClear}>
          CLEAR!
        </Button>
      </TopButtons>
      <Content>
        <Canvas setMyCanvas={setMyCanvas} />
      </Content>
    </>
  );
};

export default React.memo(CanvasContainer);
