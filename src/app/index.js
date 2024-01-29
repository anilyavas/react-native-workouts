import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList } from 'react-native';
import exercises from '../../assets/data/exercises.json';
import { ExerciseListItem } from '../../src/components/ExerciseListItem';

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 5 }}
        data={exercises}
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
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    padding: 10,
  },
});
