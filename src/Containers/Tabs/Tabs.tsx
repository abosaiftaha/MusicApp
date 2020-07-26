import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Platform, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Theme/Colors';
import Fonts from '../../Theme/Fonts';
import Albums from './Albums/Albums';
import Artists from './Artists/Artists';
import Tracks from './Tracks/Tracks';

// Tabs Navigator
export type TabsStackParamList = {
  Tracks: undefined;
  Artists: undefined;
  Albums: undefined;
};

const Tab = createBottomTabNavigator<TabsStackParamList>();

const Tabs: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.black,
        style: {
          height: Platform.OS === 'android' ? 80 : 100,
          paddingHorizontal: Platform.OS === 'android' ? 0 : 15,
          marginHorizontal: 0,
          borderTopWidth: 1,
          borderTopColor: Colors.black,
        },
        tabStyle: {
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="Tracks"
        component={Tracks}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="audiotrack"
                size={size}
                color={color}
                style={styles.tabIcon}
              />
            );
          },
          tabBarLabel: () => {
            return <Text style={[styles.tabLabel]}>Tracks</Text>;
          },
        }}
      />
      <Tab.Screen
        name="Artists"
        component={Artists}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="contacts"
                size={size}
                color={color}
                style={styles.tabIcon}
              />
            );
          },
          tabBarLabel: () => {
            return <Text style={[styles.tabLabel]}>Artists</Text>;
          },
        }}
      />
      <Tab.Screen
        name="Albums"
        component={Albums}
        options={{
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="album"
                size={size}
                color={color}
                style={styles.tabIcon}
              />
            );
          },
          tabBarLabel: () => {
            return <Text style={[styles.tabLabel]}>Albums</Text>;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    paddingBottom: Platform.OS === 'android' ? 15 : 5,
  },
  tabLabelBold: {fontFamily: Fonts.bold},
  tabIcon: {
    marginTop: Platform.OS === 'android' ? 15 : 10,
    height: 30,
    width: 30,
    marginLeft: 5,
  },
});
