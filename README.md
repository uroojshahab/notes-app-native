# 📝 Notes App with Expo Router

This is a simple yet functional Notes App built using **React Native** and **Expo Router**. The app allows users to add, view, and delete personal notes, with data stored locally on the device.

---

## 🚀 Features

- 📄 Create a new note with a title and content
- 📋 View list of all saved notes
- 🗑 Delete any note
- 🔗 Navigate to a detailed screen for each note
- 💾 Local data persistence using AsyncStorage

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **expo-router** for routing and navigation
- **AsyncStorage** (via `@react-native-async-storage/async-storage`) for persistent local storage
- **UUID** (`uuid` package) for generating unique note IDs

---



## 🧠 How It Works

### ➕ Adding a Note

- Input fields for **title** and **content**
- A "Add Note" button calls `addNote()`:
  - Generates a unique ID with `uuidv4()`
  - Creates a new `Note` object
  - Updates local state with `setNotes(...)`
  - Saves updated notes to local storage via `saveNotes(...)`

### 📦 Data Storage

- Notes are saved and retrieved using `AsyncStorage`:
  - `saveNotes(notes: Note[])`: saves note array as JSON
  - `loadNotes(): Promise<Note[]>`: loads notes from storage

### 📜 Viewing Notes

- All notes are listed using a `ScrollView`
- Each note is rendered using the `NoteItem` component
- Tapping a note triggers navigation to the note detail screen via:

```tsx
router.push(`/(tabs)/note/${note.id}`);
  🧭 Navigation
expo-router is used for file-based routing

router.push(...) navigates to a note’s detail screen

[id].tsx uses useLocalSearchParams() to extract the dynamic route parameter

❌ Deleting Notes
deleteNote(id: string) filters out the deleted note

Updates local state and saves the new list using saveNotes(...)

🧪 Functions Used
useState and useEffect (React hooks)

useRouter from expo-router

useLocalSearchParams for dynamic route parameters

uuidv4() for generating unique note IDs

AsyncStorage.setItem() and .getItem() for saving/loading notes