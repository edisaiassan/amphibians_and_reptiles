import { StyleSheet, Text } from 'react-native';

export default function H5({ children, color }) {
  return (
    <Text style={[styles.textStyle, color && { color }]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});