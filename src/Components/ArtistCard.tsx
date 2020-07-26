import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {API_KEY, API_URL} from '../Configs';
import Colors from '../Theme/Colors';
import Fonts from '../Theme/Fonts';

export interface ArtistCardProps {
  item: {
    artist: string;
    cover: string;
    id_artist: string;
  };
  disabled?: boolean;
}

const ArtistCard: React.SFC<ArtistCardProps> = ({item, disabled}) => {
  const [showModal, setShowModal] = useState(false);
  const [artistData, setArtistData] = useState<{
    artist: string;
    gender: 'female' | 'male' | '';
    country: string;
    youtube: string;
    instagram: string;
    twitter: string;
    facebook: string;
    website: string;
    spotify: string;
  }>({
    artist: '',
    gender: '',
    country: '',
    youtube: '',
    instagram: '',
    twitter: '',
    facebook: '',
    website: '',
    spotify: '',
  });

  const fetchArtistData = async () => {
    const response = await fetch(
      `${API_URL}/artists/${item.id_artist}?apikey=${API_KEY}`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();

    return data;
  };

  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={styles.card}
        onPress={() => {
          setShowModal(true);
          fetchArtistData()
            .then((data) => {
              setArtistData(data.result);
            })
            .catch((error) => {
              setShowModal(false);
              Alert.alert(error);
            });
        }}>
        <Image
          source={{
            uri: `${item.cover}`,
          }}
          style={styles.cover}
        />
        <View style={styles.text}>
          <Text style={styles.trackName}>{item.artist}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <TouchableOpacity
            hitSlop={{bottom: 5, left: 5, top: 5, right: 5}}
            style={[styles.modalCloseContainer]}
            onPress={() => {
              setShowModal(false);
            }}>
            <EvilIcons name="close" size={25} />
          </TouchableOpacity>

          <View style={styles.modalCoverContainer}>
            <Image
              source={{
                uri: `${item.cover}`,
              }}
              style={styles.modalCover}
            />
          </View>
          <ScrollView>
            <View style={styles.marginHorizontal}>
              <Text style={styles.modalTrackName}>{item.artist}</Text>
              <Text style={[styles.modalTrackInfoYellow]}>
                {artistData.gender}
              </Text>
              {artistData.youtube ? (
                <View style={styles.row}>
                  <Icon name="youtube" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.youtube}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {artistData.instagram ? (
                <View style={styles.row}>
                  <Icon name="instagram" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.instagram}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {artistData.twitter ? (
                <View style={styles.row}>
                  <Icon name="twitter" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.twitter}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {artistData.facebook ? (
                <View style={styles.row}>
                  <Icon name="facebook" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.facebook}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {artistData.spotify ? (
                <View style={styles.row}>
                  <Icon name="spotify" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.spotify}
                  </Text>
                </View>
              ) : (
                <View />
              )}
              {artistData.website ? (
                <View style={styles.row}>
                  <Icon name="website" size={25} style={styles.icon} />
                  <Text style={[styles.modalTrackInfo]}>
                    {artistData.website}
                  </Text>
                </View>
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  text: {flexBasis: '65%'},
  trackName: {
    fontSize: Fonts.sm,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 10,
  },
  modalTrackName: {
    fontSize: Fonts.md,
    fontFamily: Fonts.bold,
    color: Colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  trackInfo: {
    fontSize: Fonts.xsm,
    fontFamily: Fonts.regular,
    color: Colors.primary,
  },
  modalTrackInfo: {
    fontSize: Fonts.xsm,
    fontFamily: Fonts.regular,
    color: Colors.black,
    textAlign: 'center',
  },
  modalTrackInfoYellow: {
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: Fonts.sm,
    marginBottom: 15,
  },
  cover: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
    flexBasis: '30%',
  },
  modalCover: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  modalCoverContainer: {
    width: 200,
    height: 200,
    borderRadius: 30,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    fontFamily: Fonts.regular,
    marginVertical: 20,
  },
  modalCloseContainer: {
    justifyContent: 'center',
    marginVertical: 20,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  marginHorizontal: {marginHorizontal: 20},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  icon: {marginRight: 10},
});
