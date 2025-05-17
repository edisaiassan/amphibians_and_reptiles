module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // No pongas nativewind aquí
    plugins: [
      'nativewind/babel', // Aquí sí va
      'react-native-reanimated/plugin', // Skia / animaciones
    ],
  };
};
