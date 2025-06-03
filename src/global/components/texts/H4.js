import { Text } from 'react-native';

export default function H4({ children, color, className }) {
  return (
    <Text className={`${color} text-[16px] leading-[24px] font-[500] tracking-[0.15] ${className}`}>
      {children}
    </Text>
  );
}
