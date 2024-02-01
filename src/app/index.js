import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { ExerciseListItem } from '../../src/components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import client from '../graphqlClient';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
      equipment
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: () => client.request(exercisesQuery),
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    console.log(error);
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});
