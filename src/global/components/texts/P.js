import { Text } from 'react-native'

export default function P({ children, color, className, style }) {
  return (
    <Text className={`${color} text-[14px] leading-[20px] font-normal tracking-[0.25] ${className}`} style={style}>
      {children}
    </Text>
  );
}
