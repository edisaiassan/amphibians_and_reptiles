import { Text } from 'react-native';

export default function H5({ children, color, className }) {
  return (
    <Text className={`${color} text-[14px] leading-[20px] font-[500] tracking-[0.1] ${className}`}>
      {children}
    </Text>
  );
}
