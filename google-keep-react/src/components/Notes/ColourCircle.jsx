import React from "react";

export const ColourCircle = (props) => {
  const { note, colour, setNoteColour, editNote } = props;

  const noteColourHandler = (e) => {
    e.stopPropagation();
    editNote(note, colour);
    setNoteColour(colour);
  };

  return (
    <span
      className="colour-circle"
      style={{ background: `${colour}` }}
      onClick={noteColourHandler}
    ></span>
  );
};
