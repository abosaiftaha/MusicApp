import {debounce} from 'lodash';
import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {API_KEY, API_URL} from '../Configs';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

export interface SearchProps {
  value: string;
  searchType: 'track' | 'artist' | 'album';
  placeholder: string;
  setValue: (e: string) => void;
  setSearchResult: (e: []) => void;
  setLoading: (e: boolean) => void;
}

const Search: React.SFC<SearchProps> = ({
  value,
  setValue,
  placeholder,
  setSearchResult,
  setLoading,
  searchType,
}) => {
  const setData = (searchTerm: string) => {
    fetch(
      `${API_URL}?q=${searchTerm}&limit=&apikey=${API_KEY}&type=${searchType}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setSearchResult(responseJson.result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const debounceLoadData = React.useCallback(debounce(setData, 500), []);

  React.useEffect(() => {
    if (value.length >= 3) {
      setLoading(true);
      debounceLoadData(value);
    }

    if (value.length < 3) {
      setSearchResult([]);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceLoadData, value]);

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>
      <View style={styles.searchContainer}>
        <TextInput
          value={value}
          onChangeText={(e: string) => setValue(e)}
          placeholder={placeholder}
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 10,
    fontFamily: Fonts.regular,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  searchText: {padding: 10, fontSize: Fonts.md, fontFamily: Fonts.bold},
});
