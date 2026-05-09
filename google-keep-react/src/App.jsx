import React, { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";
import Notes from "./components/Notes/Notes";
// import { coloursLight, coloursDark } from "../../constants/NoteColours";

import "./App.css";

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem("notesArr");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("notesArr", JSON.stringify(notes));
  }, [notes]);

  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cursorOnModal, setCursorOnModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const addNote = (note) =>
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });

  const editNote = (editedNote, colour) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (editedNote.id !== note.id) return note;

        const nextBackgroundColor =
          colour !== undefined && colour !== null
            ? colour
            : editedNote.backgroundColor ?? note.backgroundColor;

        return {
          ...note,
          ...editedNote,
          title: editedNote.title,
          text: editedNote.text,
          backgroundColor: nextBackgroundColor,
        };
      }),
    );
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => {
        return id !== note.id;
      });
    });
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="navbar-area">
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="main-area">
        <div className="sidebar-area">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <div className="notes-grid">
          <Form addNote={addNote} selectedNote={selectedNote} />
          <Notes
            notes={notes}
            deleteNote={deleteNote}
            toggleModal={toggleModal}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            editNote={editNote}
          />
          {isModalOpen && (
            <Modal
              isModalOpen={isModalOpen}
              selectedNote={selectedNote}
              toggleModal={toggleModal}
              setCursorOnModal={setCursorOnModal}
              editNote={editNote}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
