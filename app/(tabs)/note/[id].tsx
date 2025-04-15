import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function NoteDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Note ID: {id}</Text>
    </View>
  );
}
