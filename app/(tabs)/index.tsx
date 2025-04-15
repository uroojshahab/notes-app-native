import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Note } from '../../types';
import { saveNotes, loadNotes } from '../../utils/storage';
import { v4 as uuidv4 } from 'uuid';
import NoteItem from '../../components/NoteItem';
import { useRouter } from 'expo-router';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const load = async () => {
    const saved = await loadNotes();
    setNotes(saved);
  };

  useEffect(() => {
    load();
  }, []);

  const addNote = async () => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    await saveNotes(updated);
    setTitle('');
    setContent('');
  };

  const deleteNote = async (id: string) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
    await saveNotes(filtered);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>My Notes</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Content"
        style={[styles.input, styles.textarea]}
        multiline
        value={content}
        onChangeText={setContent}
      />
      <Button title="Add Note" onPress={addNote} />

      {notes.map((note) => (
  <NoteItem
    key={note.id}
    note={note}
    onDelete={() => deleteNote(note.id)}
    onPress={() => router.push(`./(tabs)/note/${note.id}`)}
  />
))}

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
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
    height: 80,
  },
});
