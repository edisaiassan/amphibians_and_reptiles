import { Text } from 'react-native';

export default function H5({ children, color, className }) {
  return (
    <Text className={`${color} text-[14px] leading-[20px] font-normal tracking-[0.25] ${className}`}>
      {children}
    </Text>
  );
}