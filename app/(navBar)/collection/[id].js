import { useLocalSearchParams } from 'expo-router'
import CollectionPage from '../../../src/presentation/pages/collections/subroute/collection/CollectionPage'

export default function SpacieDetail() {
  const { id } = useLocalSearchParams();
  return (
    <CollectionPage id={id}/>
  );
}