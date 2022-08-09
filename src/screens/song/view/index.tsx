import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  Text,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import moment from 'moment';
import {trackDuration} from '@helper';
import {arrow} from '@assets';
import {colors, constants} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackNavigatorParams} from 'src/navigator';

type ViewSongProps = {
  navigation: StackNavigationProp<StackNavigatorParams, 'ViewSong'>;
  route: RouteProp<StackNavigatorParams, 'ViewSong'>;
};

const ViewSong = ({navigation, route}: ViewSongProps) => {
  const song = route.params?.song;
  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = 245;
  //Max Height of the Header
  const Header_Minimum_Height = 85;
  //Min Height of the Header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [colors.primaryColor, colors.primaryColor],
    extrapolate: 'clamp',
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [Header_Maximum_Height, Header_Minimum_Height],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            height: animateHeaderHeight,
            backgroundColor: animateHeaderBackgroundColor,
          },
        ]}
      >
        {song?.artworkUrl100 ? (
          <Image
            style={styles.imageContainer}
            source={{uri: song.artworkUrl100}}
          />
        ) : null}
        {song?.artworkUrl100 ? <View style={styles.imageContainer} /> : null}
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image style={styles.iconStyle} source={arrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {song?.trackName ? song.trackName : constants.unknownTrack}
          </Text>
        </View>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: AnimatedHeaderValue},
              },
            },
          ],
          {useNativeDriver: false},
        )}
      >
        <View style={styles.viewContainer}>
          {song?.artistName ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Artist Name</Text>
              <Text style={styles.textStyle}>{song.artistName}</Text>
            </View>
          ) : null}
          {song?.kind && song?.primaryGenreName ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Genre</Text>
              <Text style={styles.textStyle}>
                {song.primaryGenreName} {song.kind}
              </Text>
            </View>
          ) : null}
          {song?.releaseDate ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Release Date</Text>
              <Text style={styles.textStyle}>
                {moment(song.releaseDate).format('DD MMM, YYYY')}
              </Text>
            </View>
          ) : null}
          {song?.collectionPrice && song?.currency ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Price</Text>
              <Text style={styles.textStyle}>
                {song.currency} {song.collectionPrice}
              </Text>
            </View>
          ) : null}
          {song?.trackTimeMillis ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Duration</Text>
              <Text style={styles.textStyle}>
                {trackDuration(song.trackTimeMillis)}m
              </Text>
            </View>
          ) : null}
          {song?.previewUrl ? (
            <View style={styles.contentContainer}>
              <Text style={styles.textHeading}>Audio Link</Text>
              <Text
                onPress={() => {
                  if (song?.previewUrl) Linking.openURL(song?.previewUrl);
                }}
                style={styles.textStyle}
              >
                Click here
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginStart: 16,
    marginEnd: 16,
  },
  viewContainer: {
    paddingHorizontal: 16,
    paddingBottom: 600,
  },
  contentContainer: {
    marginTop: 25,
  },
  header: {
    justifyContent: 'flex-end',
    left: 0,
    right: 0,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginStart: 12,
  },
  textStyle: {
    color: colors.primaryColor,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  textHeading: {
    color: colors.textHeadingColor,
    fontSize: 14,
  },
});

export default ViewSong;
