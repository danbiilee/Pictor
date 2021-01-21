import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getParticles } from '../../redux/particles';

import Button from '../common/Button';
import SVG from '../common/SVG';

const Ul = styled.ul`
  padding: 3px;
`;
const Li = styled.li`
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 5px;
  }
  border: ${props => (props.isSelected ? '3px solid #fff' : 0)};
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

const SelectBlock = styled.div`
  position: absolute;
  visibility: ${props => (props.isSelected ? 'visible' : 'hidden')};
  width: 100%;
  height: 130px;
  background: rgba(0, 0, 0, 0.4);
`;

const ImageList = ({ selectedList, onToggle }) => {
  //let particles = useSelector(state => selectParticles(state.particles));
  const { particles } = useSelector(state => state.particles);
  const dispatch = useDispatch();

  // 마운트 후 indexedDB 값 리덕스 스토어에 셋팅
  useEffect(() => {
    if (!particles || !particles.length) {
      dispatch(getParticles());
      //console.log('ImageList dispatch');
    }
    //console.log('ImageList mount');
  }, []);

  // 선택여부 속성 추가
  const filteredList = particles.map(p => {
    const check = selectedList.includes(p.id);
    return check ? { ...p, isSelected: true } : { ...p, isSelected: false };
  });

  //console.log('ImageList', filteredList, selectedList);

  return (
    <Ul>
      {filteredList && filteredList.length
        ? filteredList.map(particle => (
            <Li
              key={particle.id}
              isSelected={particle.isSelected}
              onClick={() => onToggle(particle.id)}
            >
              <SelectBlock isSelected={particle.isSelected} />
              <Img alt="particle example" src={particle.file} />
            </Li>
          ))
        : null}
    </Ul>
  );
};

export default ImageList;
