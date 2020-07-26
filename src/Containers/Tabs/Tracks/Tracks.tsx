import React, {useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageRequireSource,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Search from '../../../Components/Search';
import Colors from '../../../Theme/Colors';
import Fonts from '../../../Theme/Fonts';
import TrackCard from './Components/TrackCard';

const discover = require('../../../../Assets/Images/type.png') as ImageRequireSource;
const noResults = require('../../../../Assets/Images/noResults.png') as ImageRequireSource;

const Tracks = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Search
        searchType="track"
        value={search}
        setValue={setSearch}
        setLoading={setLoading}
        setSearchResult={setSearchResult}
        placeholder="Enter you Fav song name..."
      />

      <FlatList
        data={searchResult}
        initialNumToRender={10}
        onEndReachedThreshold={10}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return <TrackCard item={item} />;
        }}
        style={styles.flex1}
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode={'on-drag'}
        ListEmptyComponent={() => {
          return search.length === 0 && !loading ? (
            <View style={styles.noResultsContainer}>
              <Image source={discover} style={styles.noResultsImage} />
              <Text style={styles.noResultsTitle}>Want to see cool thing?</Text>
              <Text style={styles.noResultsText}>
                Enter the name of your favorite song
              </Text>
            </View>
          ) : loading ? (
            <ActivityIndicator />
          ) : (
            <View style={styles.noResultsContainer}>
              <Image source={noResults} style={styles.noResultsImage} />
              {/* <Icon name="frown" color={Colors.primary} size={100} /> */}
              <Text style={styles.noResultsTitle}>No Results Found</Text>
              <Text style={styles.noResultsText}>
                Are you sure this is the correct spelling ?
              </Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Tracks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.l,
    color: Colors.black,
  },
  flex1: {flex: 1, marginTop: 20, width: '100%'},
  noResultsContainer: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsTitle: {
    fontFamily: Fonts.bold,
    fontSize: Fonts.l,
    color: Colors.black,
    marginTop: 20,
    textAlign: 'center',
    width: '80%',
  },
  noResultsText: {
    fontFamily: Fonts.regular,
    fontSize: Fonts.sm,
    color: Colors.black,
  },
  noResultsImage: {height: 250, resizeMode: 'contain'},
});
