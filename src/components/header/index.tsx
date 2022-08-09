import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {arrow} from '@assets';
import {colors} from '@theme';

export type HeaderViewProps = {
  title: string;
  onBack: (() => void) | null;
};

const HeaderView = (props: HeaderViewProps) => {
  const {title, onBack} = props;
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity
          onPress={() => {
            onBack();
          }}
        >
          <Image style={styles.iconContainer} source={arrow} />
        </TouchableOpacity>
      ) : (
        <View style={styles.emptyContainer} />
      )}
      <Text style={styles.textStyle}>{title ? title : ''}</Text>
      <View style={styles.emptyContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 65,
    backgroundColor: colors.primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  emptyContainer: {
    width: 16,
    height: 16,
  },
  textStyle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default HeaderView;
