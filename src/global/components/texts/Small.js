import { Text } from 'react-native';

export default function Small({ children, color }) {
  return (
    <Text className={`${color} text-[12px] leading-[16px] font-normal tracking-[0.4]`}>
      {children}
    </Text>
  );
}