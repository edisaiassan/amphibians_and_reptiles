import { StyleSheet, Text } from 'react-native';

/* Headline Large (Title for Landing) */

export default function H1({ children, color }) {
  return (
    <Text style={[styles.textStyle, color && { color }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400',
    letterSpacing: 0,
  },
});