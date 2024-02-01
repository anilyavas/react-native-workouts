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
  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return request({
        url,
        document: exercisesQuery,
        requestHeaders: {
          Authorization:
            'apikey campigliamarittima::stepzen.io+1000::e8f1f13d8a937cc4f7e68c32a1cbef64070a0143ee2bb5d22b09933c06eab84d',
        },
      });
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
