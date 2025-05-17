import { StyleSheet, Text } from 'react-native';

export default function H4({ children, color }) {
  return (
    <Text style={[styles.textStyle, color && { color }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
});