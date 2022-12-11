import {Button, Icon, Input} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {IFormInsertUpsertTanamanObat} from '../../interfaces';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {
  addDataTanaman,
  updateDataTanaman,
} from '../../config/firebase/fetchData/addDataTanaman';
import {showError, showSuccess} from '../../utils/showMessage';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import {DATA_TANAMAN_COLLECTION} from '../../config/firebase/firestore/collection';
interface IProps {
  route: any;
  navigation: any;
}

const FormInsertUpsertTanaman: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const [typeForm, setTypeForm] = useState('');
  const [loading, setLoading] = useState(false);
  const [tanamanId, setTanamanId] = useState('');
  const [form, setForm] = useState<IFormInsertUpsertTanamanObat>({
    namaLokal: '',
    namaLatin: '',
    family: '',
    morfologi: '',
    kandunganKimia: '',
    khasiatObat: '',
    bagianYangDigunakan: '',
    caraMeramu: '',
    statusPerlindungan: '',
    image_name: '',
    img_uri: null,
  });
  const handleOnChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('typeForm', typeForm);
    if (typeForm === 'insert') {
      // add
      dispatch({
        type: 'SET_LOADING',
        value: true,
      });
      try {
        // update data here
        await addDataTanaman(form);
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showSuccess('Berhasil Tambah Data');
        props.navigation.goBack();
      } catch (err) {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      }
    } else {
      // update
      dispatch({
        type: 'SET_LOADING',
        value: true,
      });
      try {
        // update data here
        await updateDataTanaman(form, tanamanId);
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showSuccess('Berhasil Update Data');
        props.navigation.navigate('DetailTanalam', {
          tanamanId,
        });
      } catch (err) {
        dispatch({
          type: 'SET_LOADING',
          value: false,
        });
        showError(err.message);
      }
    }
  };

  const handleRemovePhotoVaksin = (): void => {
    setForm({
      ...form,
      image_name: '',
      img_uri: null,
    });
  };

  const getImageFromGallery = () => {
    let options: any = {
      title: 'You can choose one image',
      includeBase64: true,
      quality: 1,
      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        showMessage({
          message: 'Oops, kamu batal upload foto',
          type: 'default',
          backgroundColor: colors.green3,
          color: colors.white,
        });
      } else {
        // console.log('response', response);
        if (response.assets) {
          console.log('response.assets[0].uri', response.assets[0].uri);
          setForm({
            ...form,
            image_name: response.assets[0].fileName ?? '',
            img_uri: response.assets[0].uri ?? '',
          });
        }
      }
    });
  };

  const handleGetData = async (id: string) => {
    setLoading(true);
    const res = await DATA_TANAMAN_COLLECTION.doc(id).get();
    console.log('res', res.data());
    setForm({
      ...res.data(),
    });
    setLoading(false);
  };

  useEffect(() => {
    setTypeForm(props.route.params.typeForm);
    if (props.route.params.tanamanId) {
      setTanamanId(props.route.params.tanamanId);
      handleGetData(props.route.params.tanamanId);
    }
    // run firebase in here
  }, []);

  return loading ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <View style={styles.root}>
      <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10}}>
        Form Tambah Data Tanaman
      </Text>
      <ScrollView style={{marginTop: 5}} showsHorizontalScrollIndicator={false}>
        <View style={styles.content}>
          <Input
            label="Nama Lokal"
            onChangeText={(value: any) => handleOnChange('namaLokal', value)}
            placeholder="Nama Lokal"
            value={form.namaLokal}
          />
          <Input
            label="Nama Latin"
            onChangeText={(value: any) => handleOnChange('namaLatin', value)}
            placeholder="Nama Latin"
            value={form.namaLatin}
          />
          <Input
            label="Family"
            onChangeText={(value: any) => handleOnChange('family', value)}
            placeholder="Family"
            value={form.family}
          />
          <Input
            label="Morfologi"
            multiline
            onChangeText={(value: any) => handleOnChange('morfologi', value)}
            placeholder="Morfologi"
            value={form.morfologi}
          />
          <Input
            multiline
            label="Kandungan Kimia"
            onChangeText={(value: any) =>
              handleOnChange('kandunganKimia', value)
            }
            placeholder="Kandungan Kimia"
            value={form.kandunganKimia}
          />
          <Input
            label="Khasiat Obat"
            onChangeText={(value: any) => handleOnChange('khasiatObat', value)}
            placeholder="Khasiat Obat"
            value={form.khasiatObat}
            multiline
          />
          <Input
            multiline
            label="Bagian Yang Digunakan"
            onChangeText={(value: any) =>
              handleOnChange('bagianYangDigunakan', value)
            }
            placeholder="Bagian Yang Digunakan"
            value={form.bagianYangDigunakan}
          />
          <Input
            label="Cara Meramu"
            onChangeText={(value: any) => handleOnChange('caraMeramu', value)}
            placeholder="Cara Meramu"
            value={form.caraMeramu}
            multiline
          />
          <Input
            label="Status Perlindungan"
            onChangeText={(value: any) =>
              handleOnChange('statusPerlindungan', value)
            }
            placeholder="Status Perlindungan"
            value={form.statusPerlindungan}
          />
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 4}}>
            Gambar
          </Text>
          <View style={styles.avatarWrapper}>
            <Image source={{uri: form.img_uri}} style={styles.avatar} />
          </View>
          {form.img_uri ? (
            <TouchableOpacity onPress={handleRemovePhotoVaksin}>
              <Text
                style={{
                  padding: 4,
                  fontSize: 18,
                  fontWeight: 'bold',
                  backgroundColor: colors.red2,
                  color: 'white',
                  textAlign: 'center',
                }}>
                Hapus
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={getImageFromGallery}>
              <Text
                style={{
                  padding: 4,
                  fontSize: 18,
                  fontWeight: 'bold',
                  backgroundColor: colors.green3,
                  color: colors.white,
                  textAlign: 'center',
                }}>
                Upload Gambar
              </Text>
            </TouchableOpacity>
          )}
          <View style={{height: 30}} />
          <Button type="solid" onPress={handleSubmit}>
            {typeForm === 'insert' ? 'Tambah' : 'Update'}
            <Icon name={typeForm === 'insert' ? 'add' : 'edit'} color="white" />
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default FormInsertUpsertTanaman;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  background: {
    height: 200,
    paddingTop: 30,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.white,
    marginTop: 6,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 14,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    paddingBottom: 20,
    // marginTop: -30,
  },
  avatarWrapper: {
    width: '100%',
    height: 350,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: 350,
  },
});
