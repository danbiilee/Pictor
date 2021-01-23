import Dexie from 'dexie';

// indexedDB Setting
const db = new Dexie('PictorDB');
db.version(1).stores({
  pictures: '++id, type, src',
});
db.open().catch(err => console.log(err.stack || err));

export const getPictures = async () => {
  const result = await db.pictures.toArray();
  return result;
};

export const addPicture = async payload => {
  const resultId = await db.pictures.add(payload); // keyPath 반환
  const result = await db.pictures.get(resultId);
  return result;
};

export const deletePicture = async payload => {
  const count = await db.pictures.where('id').anyOf(payload).delete(); // 삭제한 개수 반환
  let result = [];
  if (count > 0) {
    result = await db.pictures.toArray();
  }
  return result;
};
