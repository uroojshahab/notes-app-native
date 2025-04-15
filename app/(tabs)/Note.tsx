import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loadNotes, saveNotes } from '../../utils/storage';
import { Note } from '../../types';



export default function NoteDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const notes = await loadNotes();
      const found = notes.find((n) => n.id === id);
      if (found) setNote(found);
      else Alert.alert('Note not found');
    };
    fetchNote();
  }, [id]);

  const save = async () => {
    const notes = await loadNotes();
    const updated = notes.map((n) => (n.id === id ? note! : n));
    await saveNotes(updated);
    router.back();
  };

  if (!note) return null;

  return (
    <View style={styles.container}>
      <TextInput
        value={note.title}
        onChangeText={(text) => setNote({ ...note, title: text })}
        style={styles.input}
        placeholder="Title"
      />
      <TextInput
        value={note.content}
        onChangeText={(text) => setNote({ ...note, content: text })}
        style={[styles.input, styles.textarea]}
        placeholder="Content"
        multiline
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
  },
});