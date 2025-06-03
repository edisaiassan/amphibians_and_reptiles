import { Text } from 'react-native';

/* Subtitle for landing */

export default function H2({ children, color }) {
  return (
    <Text className={`${color} text-[28px] leading-[36px] font-normal tracking-[0]`}>
      {children}
    </Text>
  );
}