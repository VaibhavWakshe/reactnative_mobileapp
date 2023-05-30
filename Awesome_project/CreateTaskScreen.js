import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { auth, firestore } from '../firebase';

const CreateTaskScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    const newTask = {
      title,
      description,
      userId: auth.currentUser.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    firestore.collection('tasks').add(newTask)
      .then(() => {
        // Handle successful task creation
      })
      .catch((error) => {
        // Handle task creation error
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Create Task" onPress={handleCreateTask} />
    </View>
  );
};

export default CreateTaskScreen;