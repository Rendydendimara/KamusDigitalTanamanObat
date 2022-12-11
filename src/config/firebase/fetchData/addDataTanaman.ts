import storage from '@react-native-firebase/storage';
import {IFormInsertUpsertTanamanObat} from '../../../interfaces';
import {DATA_TANAMAN_COLLECTION} from '../firestore/collection';

export const addDataTanaman = (data: IFormInsertUpsertTanamanObat) =>
  new Promise(async (resolve, reject) => {
    try {
      let url = '';
      // if (data.img_uri) {
      //   const reference = storage().ref(`data-tanaman-obat/${data.image_name}`);
      //   await reference.putFile(data.img_uri);
      //   url = await storage()
      //     .ref(`data-tanaman-obat/${data.image_name}`)
      //     .getDownloadURL();
      // }
      await DATA_TANAMAN_COLLECTION.add({
        namaLokal: data.namaLokal,
        namaLatin: data.namaLatin,
        family: data.family,
        morfologi: data.morfologi,
        kandunganKimia: data.kandunganKimia,
        khasiatObat: data.khasiatObat,
        bagianYangDigunakan: data.bagianYangDigunakan,
        caraMeramu: data.caraMeramu,
        statusPerlindungan: data.statusPerlindungan,
        gambar: url,
        createdAt: new Date().getTime(),
      });

      resolve({
        success: true,
        data: 'Berhasil tambah data',
      });
    } catch (err) {
      reject(err);
    }
  });

export const updateDataTanaman = (
  data: IFormInsertUpsertTanamanObat,
  id: string,
) =>
  new Promise(async (resolve, reject) => {
    try {
      let url = '';
      // if (data.img_uri) {
      //   const reference = storage().ref(`data-tanaman-obat/${data.image_name}`);
      //   await reference.putFile(data.img_uri);
      //   url = await storage()
      //     .ref(`data-tanaman-obat/${data.image_name}`)
      //     .getDownloadURL();
      // }
      await DATA_TANAMAN_COLLECTION.doc(id).update({
        namaLokal: data.namaLokal,
        namaLatin: data.namaLatin,
        family: data.family,
        morfologi: data.morfologi,
        kandunganKimia: data.kandunganKimia,
        khasiatObat: data.khasiatObat,
        bagianYangDigunakan: data.bagianYangDigunakan,
        caraMeramu: data.caraMeramu,
        statusPerlindungan: data.statusPerlindungan,
        gambar: url,
        createdAt: data.createdAt,
      });

      resolve({
        success: true,
        data: 'Berhasil update data',
      });
    } catch (err) {
      reject(err);
    }
  });
