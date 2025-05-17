import { useLocalSearchParams } from 'expo-router';
import SpeciePage from '../src/presentation/pages/species/subroute/SpeciePage';

export default function SpacieDetail() {
  const { id } = useLocalSearchParams();


  return (
    <SpeciePage specieId={id}/>
  );
}