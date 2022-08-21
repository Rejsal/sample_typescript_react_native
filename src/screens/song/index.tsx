import React, {useCallback, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SongCard, Header} from '@components';
import {Dispatch, RootState} from 'src/rematch/store';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from 'src/navigator';
import {SongModel} from 'src/rematch/models/song';
import {SharedElement} from 'react-navigation-shared-element';

type SongListProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'Song'>;
};

const SongList = ({navigation}: SongListProps) => {
  const songModel = useSelector((state: RootState) => state.song);

  const {song: songDispatch} = useDispatch<Dispatch>();

  const {getSongs} = songDispatch;

  useEffect(() => {
    getSongs();
  }, []);

  // const _renderHeader = () => {
  //   return <View style={styles.listHeader} />;
  // };

  const _itemSeperator = () => {
    return <View style={styles.seperator} />;
  };

  const onClickCard = useCallback((data: SongModel) => {
    navigation.push('ViewSong', {song: data});
  }, []);

  const {loading = false, songs = []} = songModel;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <SafeAreaView style={styles.container}>
        <View style={styles.subContainer}>
          <Header title={'SONGS'} onBack={null} />
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size={'large'} />
            </View>
          ) : songs.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={songs}
              keyExtractor={(_, index) => index.toString()} // not a good practice to use index as key
              ItemSeparatorComponent={_itemSeperator}
              renderItem={({item}) => (
                // <SongCard item={item} onClickCard={onClickCard} />
                <Pressable
                  onPress={() => {
                    onClickCard(item);
                  }}
                >
                  <SharedElement id={item?.artworkUrl100 ?? ''}>
                    <Image
                      style={{width: '100%', height: 180}}
                      source={{uri: item?.artworkUrl100 ?? ''}}
                    />
                  </SharedElement>
                </Pressable>
              )}
            />
          ) : (
            <View style={styles.loaderContainer}>
              <Text>No songs to display</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 0,
    backgroundColor: colors.primaryColor,
  },
  subContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listHeader: {
    height: 16,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#990000',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: '#e4e4e4',
  },
});

export default SongList;
