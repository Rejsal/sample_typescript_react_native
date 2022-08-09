module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            '@screens': './src/screens',
            '@components': './src/components',
            '@helper': './src/helper',
            '@assets': './src/assets/images',
            '@api': './src/api',
            '@server': './src/api/server',
            '@services': './src/api/services',
            '@theme': './src/theme',
          },
        },
      ],
    ],
  };
};
