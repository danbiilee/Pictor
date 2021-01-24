import { openDB } from 'idb';

const DB_NAME = 'Pictor';
const STORE_PICTURES = 'pictures';

export const initIdb = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      // create a store
      const store = db.createObjectStore(STORE_PICTURES, {
        keyPath: 'id',
        autoIncrement: true,
      });
      // create an index
      store.createIndex('type', 'type');
    },
  });

  const result = await db.getAll(STORE_PICTURES);
  db.close();
  return result;
};

export const addPicture = async payload => {
  const db = await openDB(DB_NAME, 1);
  const keyPath = await db.add(STORE_PICTURES, payload); // keyPath 반환
  const result = await db.get(STORE_PICTURES, keyPath);
  db.close();
  return result;
};

export const deletePicture = async payload => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(STORE_PICTURES, 'readwrite');
  const store = tx.store;
  // transaction이 하나의 store만 포함한다면, tx.store가 해당 store를 참조
  // 여러 개의 store를 포함한다면, tx.objectStore(storeName) 사용

  let count = 0;
  for (const id of payload) {
    await store.delete(id);
    count++;
  }
  await tx.done; // 삭제 작업 완료

  let result = [];
  if (count > 0) {
    result = await db.getAll(STORE_PICTURES);
  }
  db.close();

  return result;
};
