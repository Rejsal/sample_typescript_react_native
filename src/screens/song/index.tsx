import React, {useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SongCard, Header} from '@components';
import {Dispatch, RootState} from 'src/rematch/store';
import {colors} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from 'src/navigator';

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

  const _renderHeader = () => {
    return <View style={styles.listHeader} />;
  };

  const _itemSeperator = () => {
    return <View style={styles.seperator} />;
  };

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
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={_renderHeader}
              ItemSeparatorComponent={_itemSeperator}
              renderItem={({item}) => (
                <SongCard
                  item={item}
                  onClickCard={data => {
                    navigation.push('ViewSong', {song: data});
                  }}
                />
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
