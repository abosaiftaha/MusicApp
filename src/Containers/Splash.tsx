import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Image,
  ImageRequireSource,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {RootStackParamList} from '../App';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

const illustration = require('../../Assets/Images/splash.jpg') as ImageRequireSource;

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;
export interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  useEffect(() => {
    const setTimer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => {
      clearTimeout(setTimer);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Music App</Text>
        <Text style={styles.text}>Lyrics on the fly</Text>
      </View>
      <Image source={illustration} style={styles.img} />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  textContainer: {
    marginTop: '20%',
    marginLeft: 20,
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.md,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.white,
    fontSize: Fonts.huge,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: 1,
  },
});
