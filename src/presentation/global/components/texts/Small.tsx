import { StyleSheet, Text } from 'react-native';

export default function Small({ children, color }) {
  return (
    <Text style={[styles.textStyle, color && { color }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.25,
  },
});