import {Button, Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {ILHospitalBG} from '../../assets/illustration';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import {DATA_TANAMAN_COLLECTION} from '../../config/firebase/firestore/collection';
import {ITanamanObat} from '../../interfaces';
import {getData} from '../../utils';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {showError, showSuccess} from '../../utils/showMessage';

interface IProps {
  route: any;
  navigation: any;
}

const DetailTanaman: React.FC<IProps> = props => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<ITanamanObat>();
  const [isUserLoginAdmin, setIsUserLoginAdmin] = useState<boolean>(false);

  const handleGetData = async (id: string) => {
    setLoading(true);
    const res = await DATA_TANAMAN_COLLECTION.doc(id).get();
    console.log('res', res.data());
    setData({
      id,
      ...res.data(),
    });
    setLoading(false);
  };

  const deleteTanaman = async () => {
    dispatch({
      type: 'SET_LOADING',
      value: true,
    });
    await DATA_TANAMAN_COLLECTION.doc(data?.id).delete();
    dispatch({
      type: 'SET_LOADING',
      value: false,
    });
    showSuccess('Berhasil Hapus Data');
    props.navigation.goBack();
  };

  const getUserLogin = async () => {
    try {
      const userLogin = await getData('user');
      userLogin ? setIsUserLoginAdmin(true) : setIsUserLoginAdmin(false);
    } catch (err) {
      showError(err.message);
    }
  };

  const gotoEditData = () => {
    props.navigation.navigate('FormInsertUpsertTanaman', {
      tanamanId: data?.id,
      typeForm: 'upsert',
    });
  };

  useEffect(() => {
    getUserLogin();
    if (props.route.params.tanamanId) {
      handleGetData(props.route.params.tanamanId);
    }
    // run firebase in here
  }, [props.route]);

  return loading ? (
    <View
      style={{
        height: '100%',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>
        <ImageBackground source={ILHospitalBG} style={styles.background}>
          <Text style={styles.textTitle}>Detail Tanaman</Text>
          <Text style={styles.textDescription}>
            Informasi detail tanaman obat
          </Text>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={{fontSize: 35, fontWeight: 'bold', color: colors.black}}>
            {data?.namaLokal}
          </Text>
          <View
            style={{
              marginTop: 20,
              display: 'flex',
              width: '100%',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: 250,
                height: 250,
              }}
              source={{
                uri: data
                  ? data.gambar.length < 1
                    ? 'https://reactnative.dev/img/tiny_logo.png'
                    : data.gambar
                  : 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <ItemInfo leftText="Nama Lokal" rightText={data?.namaLokal} />
            <ItemInfo leftText="Nama Latin" rightText={data?.namaLatin} />
            <ItemInfo leftText="Family" rightText={data?.family} />
            <ItemInfo leftText="Morfologi" rightText={data?.morfologi} />
            <ItemInfo
              leftText="Kandungan Kimia"
              rightText={data?.kandunganKimia}
            />
            <ItemInfo leftText="Khasiat / Obat" rightText={data?.khasiatObat} />
            <ItemInfo
              leftText="Bagian Yang Digunakan"
              rightText={data?.bagianYangDigunakan}
            />
            <ItemInfo leftText="Cara Meramu" rightText={data?.caraMeramu} />
            <ItemInfo
              leftText="Status Perlindungan"
              rightText={data?.statusPerlindungan}
            />
          </View>
          {isUserLoginAdmin && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <Button onPress={deleteTanaman} color="error" type="solid">
                Hapus
                <Icon name="delete" color="white" />
              </Button>
              <View style={{width: 10}} />
              <Button onPress={gotoEditData} color="warning" type="solid">
                Edit
                <Icon name="edit" color="white" />
              </Button>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailTanaman;

const ItemInfo: React.FC<any> = props => {
  return (
    <View>
      <View
        style={{
          marginTop: 5,
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
        }}>
        <View style={{width: '30%'}}>
          <Text style={{fontSize: 18, color: colors.black, fontWeight: '700'}}>
            {props.leftText}:{' '}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <Text style={{fontSize: 18}}>{props.rightText}</Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          marginVertical: 2,
          backgroundColor: colors.grey1,
        }}
      />
    </View>
  );
};

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
});
