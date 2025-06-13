import { Text } from 'react-native';

 /* Title large (presentation) text-2xl*/

export default function H3({ children, color, className }) {
  return (
    <Text className={`${color} text-[22px] leading-[28px] font-normal tracking-[0] ${className}`}>
      {children}
    </Text>
  );
}