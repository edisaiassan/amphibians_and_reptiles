import { Text } from 'react-native';

export default function H5({ children, color, className, style }) {
  return (
    <Text className={`${color} text-[14px] leading-[20px] font-[500] tracking-[0.1] ${className}`} style={style}>
      {children}
    </Text>
  );
}
