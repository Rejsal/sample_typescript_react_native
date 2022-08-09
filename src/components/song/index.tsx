import {error} from '@assets';
import {colors} from '@theme';
import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {SongModel} from 'src/rematch/models/song';
import {trackDuration} from '../../helper';

export type SongCardProps = {
  item: SongModel;
  onClickCard: (item: SongModel) => void;
};

const SongCard = (props: SongCardProps) => {
  const {item, onClickCard} = props;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onClickCard(item);
      }}
    >
      <View style={styles.subContainer}>
        {item.artworkUrl100 ? (
          <Image
            style={styles.imageContainer}
            source={{uri: item.artworkUrl100}}
          />
        ) : (
          <View style={[styles.imageContainer, styles.alignCenter]}>
            <Image style={styles.icon} source={error} />
          </View>
        )}
        <View style={styles.rightContainer}>
          <Text style={styles.heading}>
            {item.trackName ? item.trackName : ''}
          </Text>
          <View style={styles.secondaryContainer}>
            <Text style={[styles.content, styles.textContainer]}>
              {item.artistName ? item.artistName : ''}
            </Text>
            <Text
              style={[styles.content, styles.textContainer, {marginStart: 20}]}
            >
              {item.trackTimeMillis
                ? `${trackDuration(item.trackTimeMillis)}m`
                : '0m'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textContainer: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  alignCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    marginStart: 16,
    flex: 1,
  },
  imageContainer: {
    width: 65,
    height: 65,
    borderRadius: 4,
    backgroundColor: colors.secondaryColor,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.primaryColor,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
    color: colors.primaryColor,
  },
  content: {
    fontSize: 14,
    fontWeight: '300',
    color: colors.primaryColor,
  },
});

export default SongCard;
