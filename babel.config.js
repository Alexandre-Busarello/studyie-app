module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '~': './src',
          tests: './tests',
          assets: './assets',
        },
      },
    ],
    'jest-hoist',
  ],
};
