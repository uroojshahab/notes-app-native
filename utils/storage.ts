import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = 'NOTES_KEY';

export const saveNotes = async (notes: Note[]) => {
  try {
    const json = JSON.stringify(notes);
    await AsyncStorage.setItem(NOTES_KEY, json);
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

export const loadNotes = async (): Promise<Note[]> => {
  try {
    const json = await AsyncStorage.getItem(NOTES_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};
