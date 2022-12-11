import {Button, Icon} from '@rneui/base';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
// import {ICLogoGreen} from '../../assets/icon';
import {IGetStarted} from '../../assets/illustration';
import Gap from '../../components/atoms/Gap';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {
  navigation: any;
  route: any;
}

const GetStrated: React.FC<IProps> = props => {
  const gotoMainApp = () => {
    props.navigation.replace('MainApp');
  };

  const gotoLogin = () => {
    props.navigation.navigate('Login');
  };

  const gotoInfoApp = () => {
    props.navigation.navigate('InformasiAplikasi');
  };

  return (
    <ImageBackground source={IGetStarted} style={styles.rootPage}>
      {/* <ICLogoGreen /> */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fonts.primary[900],
              fontSize: 28,
              color: colors.white,
              fontWeight: 'bold',
              // color: colors.primary,
            }}>
            Kamus Digital Tanaman Obat
          </Text>
        </View>
        <Text style={styles.textTitle}>Informasi seputar tanaman obat</Text>
      </View>
      <View>
        <Button type="solid" onPress={gotoMainApp} size="lg">
          Masuk Sebagai Pengguna <Icon name="people" color="white" />
        </Button>
        <Gap height={20} />
        <Button color="success" onPress={gotoLogin} size="lg">
          Masuk Sebagai Admin <Icon name="people" color="white" />
        </Button>

        <Gap height={16} />
        <Gap height={40} />
        <Button color="warning" onPress={gotoInfoApp} size="lg">
          Informasi Aplikasi <Icon name="info" color="white" />
        </Button>
      </View>
    </ImageBackground>
  );
};

export default GetStrated;

const styles = StyleSheet.create({
  rootPage: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
    paddingTop: 20,
    justifyContent: 'space-between',
    flex: 1,
    opacity: 0.8,
    backgroundColor: '#000',
  },
  textTitle: {
    fontSize: 24,
    color: colors.white,
    // marginTop: 90,
    fontFamily: fonts.primary[600],
  },
});
