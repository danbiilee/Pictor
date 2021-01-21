import Dexie from 'dexie';

// indexedDB Setting
const db = new Dexie('ParticleMakerDB');
db.version(1).stores({
  particles: '++id, file',
});
db.open().catch(err => console.log(err.stack || err));

export const getParticles = async () => {
  const result = await db.particles.toArray();
  //console.log('getParticles api', result);
  return result;
};

export const addParticle = async payload => {
  const resultId = await db.particles.add(payload); // keyPath 반환
  const result = await db.particles.get(resultId);
  //console.log('addParticle api', result);
  return result;
};

export const deleteParticle = async payload => {
  const count = await db.particles.where('id').anyOf(payload).delete(); // 삭제한 개수 반환
  let result = [];
  if (count > 0) {
    //console.log('deleteParticle count', count);
    result = await db.particles.toArray();
  }
  return result;
};
