import { Text } from 'react-native';

/* Headline Large (Title for Landing) */

export default function H1({ children, color }) {
  return (
    <Text className={`${color} text-[32px] leading-[40px] font-normal tracking-[0]`}>
      {children}
    </Text>
  );
}