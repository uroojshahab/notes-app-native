import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Note } from '../types';

interface Props {
  note: Note;
  onDelete: () => void;
  onPress: () => void;
}

const NoteItem: React.FC<Props> = ({ note, onDelete, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.noteItem}>
      <Text style={styles.title}>{note.title}</Text>
      <Text numberOfLines={2}>{note.content}</Text>
      <Pressable onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.delete}>Delete</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 8,
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default NoteItem;
