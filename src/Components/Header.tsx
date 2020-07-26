import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

export interface HeaderProps {
  headerLeft?: 'none' | 'back';
  title?: string;
}

const Header: React.FC<HeaderProps> = ({headerLeft, title}) => {
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.headerLeft}
            onPress={
              headerLeft === 'back'
                ? () => navigation.goBack()
                : () => {
                    return;
                  }
            }>
            {headerLeft === 'back' && (
              <Icon name="swapleft" color={Colors.black} size={20} />
            )}
            {headerLeft === 'none' && <View />}
          </TouchableOpacity>
          {title ? (
            <Text style={styles.headerTitle}>{title}</Text>
          ) : (
            <Text style={styles.headerTitle}>{route.name}</Text>
          )}
          <TouchableOpacity style={styles.headerRight} />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.white,
    position: 'relative',
  },
  headerTitle: {
    fontSize: Fonts.l,
    fontFamily: Fonts.bold,
    color: Colors.black,
    alignSelf: 'center',
  },
  background: {
    backgroundColor: Colors.white,
  },
  headerLeft: {
    position: 'absolute',
    left: 30,
    top: 20,
  },
  headerRight: {
    position: 'absolute',
    right: 30,
    top: 20,
  },
});

export default Header;
