import { StyleSheet, Text } from 'react-native';

 /* Title large (presentation) text-2xl*/

export default function H3({ children, color }) {
  return (
    <Text style={[styles.textStyle, color && { color }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
    letterSpacing: 0,
  },
});