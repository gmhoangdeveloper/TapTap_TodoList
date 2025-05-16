module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@Constants': './src/Constants',
            '@Constants/*': './src/Constants/*',
            '@Screens': './src/Screens',
            '@Screens/*': './src/Screens/*',
            '@Styles': './src/Styles',
            '@Styles/*': './src/Styles/*',
            '@Components': './src/Components',
            '@Components/*': './src/Components/*',
            '@Services': './src/Services',
            '@Services/*': './src/Services/*',
            '@Utils': './src/Utils',
            '@Utils/*': './src/Utils/*',
            '@Store': './src/Store',
            '@Store/*': './src/Store/*',
            '@Images': './src/Assets/Images',
            '@Images/*': './src/Assets/Images/*',
            '@Fonts': './src/Assets/Fonts',
            '@Fonts/*': './src/Assets/Fonts/*',
            '@Assets': './src/Assets',
            '@Assets/*': './src/Assets/*',
            '@Validations': './src/Validations',
            '@Navigation': './src/Navigation',
            '@Models': './src/Models',
            '@Models/*': './src/Models/*',
          },
        },
      ],
      'react-native-reanimated/plugin'
    ],
  };
};
