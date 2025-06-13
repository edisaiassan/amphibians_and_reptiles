import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  svgContainer: {
    aspectRatio: 1, // Mantiene la proporción para width y height relativos
  },
});

export const Icon = ({
  path,
  height = 24, // En React Native, los estilos suelen ser numéricos
  width = 24,
  iconColor = "green", // Los nombres de color son directos en React Native
}) => {
  const paths = path ? path.split("/") : [];

  return (
    <View style={{ width, height: height }}>
      <Svg viewBox="0 0 24 24" width="100%" height="100%">
        {paths.map(
          (singlePath, index) =>
            singlePath && <Path key={index} d={singlePath} fill={iconColor} />
        )}
      </Svg>
    </View>
  )
}