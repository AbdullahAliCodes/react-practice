import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const {
    notes,
    deleteNote,
    toggleModal,
    selectedNote,
    setSelectedNote,
    editNote,
  } = props;

  return (
    <div className="notes">
      {notes.length === 0 ? (
        <p>Notes you add appear here.</p>
      ) : (
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
            editNote={editNote}
          />
        ))
      )}
    </div>
  );
};

export default Notes;
