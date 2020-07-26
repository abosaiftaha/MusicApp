import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {API_KEY, API_URL} from '../../../../Configs';
import Colors from '../../../../Theme/Colors';
import Fonts from '../../../../Theme/Fonts';

export interface TrackCardProps {
  item: {
    track: string;
    artist: string;
    album: string;
    cover: string;
    id_track: string;
    id_album: string;
    id_artist: string;
  };
}

const TrackCard: React.SFC<TrackCardProps> = ({item}) => {
  const [showModal, setShowModal] = useState(false);
  const [trackData, setTrackData] = useState({});
  const [trackLyrics, setTrackLyrics] = useState({});

  const fetchTrackData = async () => {
    await fetch(
      `${API_URL}/artists/${item.id_artist}/albums/${item.id_album}/tracks/${item.id_track}?apikey=${API_KEY}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTrackData(responseJson.result);
      })
      .catch((error) => {
        setShowModal(false);
        Alert.alert(error);
      });
  };

  const fetchTrackLyrics = async () => {
    await fetch(
      `${API_URL}/artists/${item.id_artist}/albums/${item.id_album}/tracks/${item.id_track}/lyrics?apikey=${API_KEY}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setTrackLyrics(responseJson.result);
      })
      .catch(() => {
        setTrackLyrics({});
      });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setShowModal(true);
          fetchTrackData();
          fetchTrackLyrics();
        }}>
        <Image
          source={{
            uri: `${item.cover}`,
          }}
          style={styles.cover}
        />
        <View style={styles.text}>
          <Text style={styles.trackName}>{item.track}</Text>
          <Text style={[styles.trackInfo, {color: Colors.black}]}>
            {item.artist}
          </Text>
          <Text style={styles.trackInfo}>{item.album}</Text>
        </View>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <SafeAreaView style={styles.modal}>
          <TouchableOpacity
            style={[styles.modalCloseContainer]}
            onPress={() => setShowModal(false)}>
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
              <Text style={styles.modalTrackName}>{item.track}</Text>
              <Text
                style={[
                  styles.modalTrackInfo,
                  {
                    color: Colors.primary,
                    fontFamily: Fonts.bold,
                    fontSize: Fonts.sm,
                  },
                ]}>
                {item.artist}
              </Text>
              <Text style={styles.modalTrackInfo}>{item.album}</Text>
              {trackData.bpm && (
                <Text style={styles.modalTrackInfo}>{trackData.bpm} BPM</Text>
              )}
              {trackData.haslyrics ? (
                <>
                  <Text style={styles.modalTrackInfo}>Lyrics :</Text>
                  <Text style={styles.modalTrackInfo}>
                    {trackLyrics.lyrics}
                  </Text>
                </>
              ) : (
                <Text style={styles.modalTrackInfo}>
                  {'Does not has Lyrics'}
                </Text>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default TrackCard;

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
    alignItems: 'flex-start',
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
});
