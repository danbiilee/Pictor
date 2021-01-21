import { createSelector } from 'reselect';

const getParticles = state => state.particles;

// 선택여부(isSelected) 속성 추가하기
export const selectParticles = createSelector([getParticles], particles => {
  return particles.map(p => ({
    ...p,
    isSelected: false,
  }));
});
