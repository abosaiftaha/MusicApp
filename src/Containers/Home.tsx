import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Page</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.l,
    color: Colors.black,
  },
});
