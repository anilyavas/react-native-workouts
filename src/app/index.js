import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import { ExerciseListItem } from '../../src/components/ExerciseListItem';
import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

const url =
  'https://campigliamarittima.stepzen.net/api/reeling-stingray/__graphql';

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      name
      muscle
    }
  }
`;

export default function ExercisesScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return request(url, exercisesQuery);
    },
  });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 5 }}
        data={data}
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
