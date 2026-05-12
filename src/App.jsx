import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { arrayMove } from "@dnd-kit/sortable";

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

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isModalOpen]);

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

  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  const reorderNotes = (activeId, overId) => {
    if (!overId || activeId === overId) return;
    setNotes((prev) => {
      const oldIndex = prev.findIndex((n) => n.id === activeId);
      const newIndex = prev.findIndex((n) => n.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
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
            reorderNotes={reorderNotes}
            togglePin={togglePin}
          />
        </div>
      </div>
      {isModalOpen &&
        createPortal(
          <Modal
            isModalOpen={isModalOpen}
            selectedNote={selectedNote}
            toggleModal={toggleModal}
            setCursorOnModal={setCursorOnModal}
            editNote={editNote}
          />,
          document.body,
        )}
    </>
  );
}

export default App;
