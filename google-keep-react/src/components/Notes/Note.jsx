import React, { useContext, useState } from "react";
import { coloursLight, coloursDark } from "../../constants/NoteColours";
import { ColourCircle } from "./ColourCircle";
import { ThemeContext } from "../../context/ThemeContext";
import { resolveNoteColor } from "../../utils/resolveNoteColor";

import "./Note.css";

const Note = (props) => {
  const { toggleModal, note, setSelectedNote, editNote } = props;
  const { theme } = useContext(ThemeContext);

  const [hoverActive, setHoverActive] = useState(false);
  const [isColourBoardActive, setIsColourBoardActive] = useState(false);
  const [noteColour, setNoteColour] = useState("white");

  const palette = theme === "dark" ? coloursDark : coloursLight;
  const displayBg = resolveNoteColor(note.backgroundColor, theme);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const noteMouseOverHandler = () => {
    setHoverActive(true);
  };
  const noteMouseOutHandler = () => {
    setHoverActive(false);
  };
  const deleteHandler = () => {
    props.deleteNote(note.id);
    toggleModal();
  };

  const toggleColourBoard = () => {
    setIsColourBoardActive((prevState) => !prevState);
    toggleModal();
  };

  const clearNoteColourHandler = (e) => {
    e.stopPropagation();
    editNote(note, "#fff");
    setNoteColour("#fff");
    // toggleModal();
  };

  return (
    <div
      className="note"
      style={{ background: displayBg }}
      id={props.id}
      onClick={noteClickHandler}
      onMouseOver={noteMouseOverHandler}
      onMouseOut={noteMouseOutHandler}
    >
      {hoverActive && (
        <span className="material-symbols-outlined check-circle">
          check_circle
        </span>
      )}

      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>

      <div
        className="note-footer"
        style={{ visibility: hoverActive ? "visible" : "hidden" }}
      >
        <div className="tooltip" onClick={toggleColourBoard}>
          <span className="material-symbols-outlined hover">
            palette
          </span>
          <span className="tooltip-text">Change Color</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">
            add_alert
          </span>
          <span className="tooltip-text">Remind me</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">
            person_add
          </span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">
            image
          </span>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div className="tooltip" onClick={deleteHandler}>
          <span className="material-symbols-outlined hover archive">
            archive
          </span>
          <span className="tooltip-text">Archive</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">
            more_vert
          </span>
          <span className="tooltip-text">More</span>
        </div>
      </div>

      {isColourBoardActive && (
        <div className="colour-board">
          <span
            className="colour-circle no-colour-circle"
            onClick={clearNoteColourHandler}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                clearNoteColourHandler(e);
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              focusable="false"
              className="no-colour"
            >
              <path d="M21.19 21.19l-3.06-3.06-1.43-1.43-8.3-8.3L7 7 2.81 2.81 1.39 4.22l4.25 4.25A8.056 8.056 0 0 0 4.01 13H4c0 4.42 3.58 8 8 8 1.74 0 3.35-.57 4.66-1.51l3.12 3.12 1.41-1.42zM12 19c-3.22 0-5.86-2.55-5.99-5.74l.01-.19c.04-1.14.42-2.25 1.06-3.18l8.16 8.16c-.95.6-2.05.95-3.24.95zm0-14.17l4.25 4.24a6.014 6.014 0 0 1 1.74 4.01l.01.17c-.02.56-.13 1.11-.3 1.62l1.53 1.53c.49-1.03.77-2.18.77-3.4h-.01a7.975 7.975 0 0 0-2.33-5.35L12 2 8.41 5.58 9.83 7 12 4.83z"></path>
            </svg>
          </span>
          {palette.map((colour) => (
            <ColourCircle
              key={colour}
              colour={colour}
              setNoteColour={setNoteColour}
              toggleModal={toggleModal}
              editNote={editNote}
              note={note}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Note;
