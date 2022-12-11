import {Button, Icon, ListItem, SearchBar} from '@rneui/base';
import {IGetStarted} from '../../assets/illustration';
import LoadingIndicator from '../../components/atoms/LoadingIndicator';
import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getData, storeData} from '../../utils';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {showError} from '../../utils/showMessage';
import {Searchbar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {ITanamanObat} from '../../interfaces';
import {getDataTanaman} from '../../config/firebase/fetchData/getDataTanaman';
import sortBy from 'lodash/sortBy';
import {Avatar} from '@rneui/base/dist/Avatar/Avatar';

interface IProps {
  navigation: any;
}
let searchTimer: any;
const MainApp: React.FC<IProps> = props => {
  const [isUserLoginAdmin, setIsUserLoginAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState('');
  const [loadingFetch, setLoadingFetch] = useState<boolean>(false);
  const [data, setData] = useState<ITanamanObat[]>([]);
  const [dataStatic, setDataStatic] = useState<ITanamanObat[]>([]);

  const binarySearch = (search: any) => {
    const dataStaticNamaLokal = dataStatic.map(data => data.namaLokal);
    var startIndex = 0,
      stopIndex = dataStaticNamaLokal.length - 1,
      middle = Math.floor((stopIndex + startIndex) / 2);

    while (dataStaticNamaLokal[middle] != search && startIndex < stopIndex) {
      //adjust search area
      if (search < dataStaticNamaLokal[middle]) {
        stopIndex = middle - 1;
      } else if (search > dataStaticNamaLokal[middle]) {
        startIndex = middle + 1;
      }

      //recalculate middle
      middle = Math.floor((stopIndex + startIndex) / 2);
    }

    //make sure it's the right search
    return dataStaticNamaLokal[middle] != search ? -1 : middle;
  };

  const updateSearch = (search: any) => {
    setSearch(search);
    const res = binarySearch(search);
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(searching, 500, search);
  };

  const searching = (query: string): void => {
    if (query !== '' && query !== undefined) {
      const searchQuery = query.toLowerCase();
      const dataStaticNamaLokal = dataStatic.map(data =>
        data.namaLokal.toLowerCase(),
      );

      const filteredData = dataStatic.filter(data => {
        if (data.namaLokal.toLowerCase().includes(searchQuery)) {
          return true;
        }
      });
      setData(filteredData);
    } else {
      setData(dataStatic);
    }
  };

  const gotoPage = (pageName: string) => {
    props.navigation.navigate(pageName);
  };

  const getUserLogin = async () => {
    setIsLoading(true);
    try {
      const userLogin = await getData('user');
      userLogin ? setIsUserLoginAdmin(true) : setIsUserLoginAdmin(false);
    } catch (err) {
      showError(err.message);
    }
    setIsLoading(false);
  };

  const goDetail = (tanamanId: string) => {
    props.navigation.navigate('DetailTanalam', {
      tanamanId,
    });
  };

  const goToAdmin = () => {
    props.navigation.navigate('Admin');
  };

  const handleGetData = async (): Promise<void> => {
    setLoadingFetch(true);
    try {
      let tempData: ITanamanObat[] = [];
      const responseGetDataVaksin: any = await getDataTanaman();
      responseGetDataVaksin.map((vaksin: any) => {
        console.log('vaksin.doc', vaksin._ref._documentPath._parts[1]);
        tempData.push({
          id: vaksin._ref._documentPath._parts[1],
          ...vaksin.data(),
        });
      });
      tempData = sortBy(tempData, 'createdAt').reverse();
      setData(tempData);
      setDataStatic(tempData);
    } catch (err) {
      showError(err.message);
    }
    setLoadingFetch(false);
  };

  const handleLogout = () => {
    storeData('user', null);
    auth().signOut();
    props.navigation.replace('GetStarted');
  };

  useEffect(() => {
    getUserLogin();
    async function funcAsynDefault() {
      await handleGetData();
    }
    funcAsynDefault();
  }, []);

  return loadingFetch ? (
    <View>
      <LoadingIndicator size="large" color="primary" />
    </View>
  ) : (
    <ScrollView
      style={{padding: 0, height: '100%'}}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>
        <ImageBackground source={IGetStarted} style={styles.background}>
          <Text style={styles.textTitle}>Kamus Digital Tanaman Obat</Text>
          <Text style={styles.textDescription}>
            Informasi seputar tanaman obat
          </Text>
        </ImageBackground>
        <View style={styles.content}>
          {isLoading ? (
            <LoadingIndicator size="small" color="primary" />
          ) : (
            <>
              {isUserLoginAdmin ? (
                <>
                  <Button
                    type="solid"
                    color="secondary"
                    onPress={handleLogout}
                    size="lg">
                    Logout
                    <Icon name="logout" color="white" />
                  </Button>
                  <Button type="solid" onPress={goToAdmin} size="lg">
                    Manajemen Data
                    <Icon name="dashboard" color="white" />
                  </Button>
                  <View style={{height: 15}}></View>
                </>
              ) : (
                <></>
              )}
              <SearchBar
                // lightTheme
                placeholder="Cari tanaman..."
                onChangeText={updateSearch}
                value={search}
              />
              {data.length === 0 && (
                <View
                  style={{
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: colors.red2,
                    }}>
                    Data Tanaman Obat Tidak Ditemukan
                  </Text>
                </View>
              )}
              {data.map((tanaman, index) => (
                <ListItem
                  onPress={() => goDetail(tanaman.id)}
                  key={index}
                  bottomDivider>
                  <Avatar
                    source={{
                      uri:
                        tanaman.gambar.length < 1
                          ? 'https://reactnative.dev/img/tiny_logo.png'
                          : tanaman.gambar,
                    }}
                  />
                  <ListItem.Content
                    style={{
                      backgroundColor: colors.green3,
                      padding: 8,
                      borderRadius: 10,
                    }}>
                    <ListItem.Title
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {tanaman.namaLokal}
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        fontSize: 16,
                        fontWeight: 'normal',
                      }}>
                      {tanaman.namaLatin}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              ))}
            </>
          )}

          {/* isUserLoginAdmin ? (
          <CardItemPage
            icon={<ICDatabase />}
            title="Manajemen Data"
            onPress={() => gotoPage('Admin')}
          />
        ) : (
          <Text>
            Kamu Bukan Admin, Untuk Saat Ini Halaman Pengguna Bukan Admin Sedang
            Dikerjakan
          </Text>
        )} */}
        </View>
      </View>
    </ScrollView>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    flex: 1,
  },
  background: {
    height: 200,
    paddingTop: 30,
    paddingHorizontal: 10,
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
    paddingTop: 14,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 1,
    marginTop: -30,
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.primary[600],
    color: colors.primary,
    textAlign: 'center',
  },
});

const CustomTitle = ({title, namaLatin}: any) => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>{title}</Text>
      <Text style={{fontStyle: 'italic', fontSize: 12}}>{namaLatin}</Text>
    </View>
  );
};
