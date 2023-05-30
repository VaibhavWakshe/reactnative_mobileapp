import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { auth, firestore } from '../firebase';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from Firestore
    const unsubscribe = firestore
      .collection('tasks')
      .where('userId', '==', auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(updatedTasks);
      });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TaskListScreen;