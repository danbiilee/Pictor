import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSelectedCrop, addParticle } from '../../redux/particles';

import TopButtons from '../layout/tabArea/TopButtons';
import Contents from '../layout/tabArea/Contents';
import Button from '../common/Button';
import Canvas from '../common/Canvas';

const CanvasContainer = () => {
  const dispatch = useDispatch();
  const { selectedCrop } = useSelector(state => state.particles);

  const [activeTarget, setActiveTarget] = useState('');
  const [myCanvas, setMyCanvas] = useState(null);

  useEffect(() => {
    if (!selectedCrop) {
      setActiveTarget('clear');
    }
    if (selectedCrop) {
      setActiveTarget('crop');
    }
  }, [selectedCrop]);

  const onClear = () => {
    dispatch(deleteSelectedCrop());
    setActiveTarget('clear');
  };

  const onSave = () => {
    dispatch(addParticle({ type: 'cropped', src: myCanvas.cropImgSrc }));
  };

  return (
    <>
      <TopButtons>
        {/* <Button padding="5px" margin="0 5px 0 0" onClick={onActive}>
          MAKE!
        </Button> */}
        <Button padding="5px" margin="0 5px 0 0" onClick={onSave}>
          SAVE
        </Button>
        <Button padding="5px" margin="0 5px 0 0" onClick={onClear}>
          CLEAR!
        </Button>
      </TopButtons>
      <Contents>
        <Canvas activeTarget={activeTarget} setMyCanvas={setMyCanvas} />
      </Contents>
    </>
  );
};

export default React.memo(CanvasContainer);
