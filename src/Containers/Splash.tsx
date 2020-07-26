import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Image,
  ImageRequireSource,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ConfigsReducer} from '../Action/types';
import {RootStackParamList} from '../App';
import {RootState} from '../Reducer';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

const illustration = require('../../Assets/Images/splash.png') as ImageRequireSource;

type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;
export interface SplashProps {
  navigation: SplashScreenNavigationProp;
}

const Splash: React.FC<SplashProps> = ({navigation}) => {
  const {loggedIn} = useSelector<RootState>(
    (state) => state.Configs,
  ) as ConfigsReducer;

  useEffect(() => {
    const setTimer = setTimeout(() => {
      loggedIn ? navigation.replace('Tabs') : navigation.replace('Login');
    }, 3000);

    return () => {
      clearTimeout(setTimer);
    };
  }, [loggedIn, navigation]);

  return (
    <SafeAreaView style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    marginHorizontal: 20,
  },
  textContainer: {
    marginBottom: 100,
    marginLeft: 20,
  },
  text: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.md,
    color: Colors.black,
  },
  title: {
    fontFamily: Fonts.bold,
    color: Colors.black,
    fontSize: Fonts.huge,
  },
  img: {
    width: '100%',
    resizeMode: 'contain',
    height: '50%',
  },
});
