import { useLocalSearchParams } from 'expo-router';
import SpeciePage from '../src/presentation/pages/species/subroute/Specie/SpeciePage';

export default function SpacieDetail() {
  const { id } = useLocalSearchParams();
  return (
    <SpeciePage id={id}/>
  );
}