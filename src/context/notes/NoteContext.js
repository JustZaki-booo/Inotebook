import { createContext} from 'react';

// Create a context for notes
const NoteContext = createContext();



export default NoteContext;

// NoteContext will be used to provide and consume notes data throughout the application
// It can be used to manage state related to notes, such as adding, deleting, or updating notes
// Components can subscribe to this context to access the notes data and functions provided by the context provider