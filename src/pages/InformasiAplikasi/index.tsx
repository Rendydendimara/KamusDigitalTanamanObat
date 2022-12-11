import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import {ICLogoGreen} from '../../assets/icon';
import {IGetStarted} from '../../assets/illustration';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

interface IProps {
  navigation: any;
  route: any;
}

const InformasiAplikasi: React.FC<IProps> = props => {
  const gotoMainApp = () => {
    props.navigation.replace('MainApp');
  };

  const gotoLogin = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={styles.rootLoginPage}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fonts.primary[900],
              fontSize: 28,
            }}>
            Info Aplikasi
          </Text>
          <Text
            style={{
              marginTop: 40,
              fontFamily: fonts.primary[400],
              fontSize: 20,
            }}>
            Aplikasi kamus digital tanaman obat.
          </Text>
        </View>
      </ScrollView>
    </View>
    // <ImageBackground source={IGetStarted} style={styles.rootPage}>
    //   {/* <ICLogoGreen /> */}
    //   <View
    //     style={{
    //       flex: 1,
    //       justifyContent: 'center',
    //     }}>
    //     <View
    //       style={{
    //         flexDirection: 'row',
    //         alignItems: 'center',
    //       }}>
    //       <Text
    //         style={{
    //           fontFamily: fonts.primary[900],
    //           fontSize: 28,
    //           color: colors.primary,
    //         }}>
    //         Kamus Digital Tanaman Obat
    //       </Text>
    //     </View>
    //     <Text style={styles.textTitle}>Informasi seputar tanaman obat</Text>
    //   </View>
    //   <View>
    //     <Button
    //       type="secondary"
    //       title="Masuk Sebagai Pengguna"
    //       onPress={gotoMainApp}
    //     />
    //     <Gap height={16} />
    //     <Button title="Login Sebagai Admin" onPress={gotoLogin} />
    //   </View>
    // </ImageBackground>
  );
};

export default InformasiAplikasi;

const styles = StyleSheet.create({
  rootLoginPage: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colors.white,
  },
  rootPage: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 40,
    paddingTop: 20,
    justifyContent: 'space-between',
    flex: 1,
    opacity: 0.9,
    backgroundColor: '#000',
  },
  textTitle: {
    fontSize: 24,
    color: colors.white,
    // marginTop: 90,
    fontFamily: fonts.primary[600],
  },
});
