import {DATA_TANAMAN_COLLECTION} from '../firestore/collection';

export const getDataTanaman = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await DATA_TANAMAN_COLLECTION.get();
      resolve(response.docs);
    } catch (err) {
      reject(err);
    }
  });
