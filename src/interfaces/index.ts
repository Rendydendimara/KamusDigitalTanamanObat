export interface IFormInsertUpsertTanamanObat {
  namaLokal: string;
  namaLatin: string;
  family: string;
  morfologi: string;
  kandunganKimia: string;
  khasiatObat: string;
  bagianYangDigunakan: string;
  caraMeramu: string;
  statusPerlindungan: string;
  image_name: string;
  img_uri: any;
  createdAt?: any;
}

export interface ITanamanObat {
  id: string;
  namaLokal: string;
  namaLatin: string;
  family: string;
  morfologi: string;
  kandunganKimia: string;
  khasiatObat: string;
  bagianYangDigunakan: string;
  caraMeramu: string;
  statusPerlindungan: string;
  gambar: string;
  createdAt: string;
}
