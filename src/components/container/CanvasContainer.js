import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeDrawnPicture, changeCanvasMode, addPicture } from '../../redux/pictures';

import SVG from '../common/SVG';
import Button from '../common/Button';
import TopButtons from '../layout/tabPanel/TopButtons';
import Content from '../layout/tabPanel/Content';
import Canvas from '../parts/Canvas';

const CanvasContainer = () => {
  //console.log('CanvasContainer');
  const dispatch = useDispatch();
  const { canvasMode } = useSelector(state => state.pictures);
  const [myCanvas, setMyCanvas] = useState(null);

  const onClear = () => {
    dispatch(changeDrawnPicture(null));
    dispatch(changeCanvasMode('clear'));
  };

  const onSave = () => {
    const payload = {
      type: canvasMode,
      src: myCanvas.drawnImgSrc,
    };
    dispatch(addPicture(payload));
    dispatch(changeDrawnPicture(null));
    dispatch(changeCanvasMode(null));
  };

  return (
    <>
      <TopButtons>
        <Button padding="5px" margin="0 5px 0 0" onClick={onSave} aria-label="저장">
          <SVG
            width="15"
            height="15"
            path="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z"
          />
        </Button>
        {/* <Button padding="5px" margin="0 5px 0 0" onClick={onClear}>
          CLEAR!
        </Button> */}
      </TopButtons>
      <Content>
        <Canvas setMyCanvas={setMyCanvas} />
      </Content>
    </>
  );
};

export default React.memo(CanvasContainer);
