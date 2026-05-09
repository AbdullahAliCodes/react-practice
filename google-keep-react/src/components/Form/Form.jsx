import { uid } from "uid";
import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { resolveNoteColor } from "../../utils/resolveNoteColor";
import "./Form.css";

const Form = (props) => {
  const { edit, selectedNote, toggleModal } = props;
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [isActiveForm, setIsActiveForm] = useState(edit);

  const titleChangeHandler = (event) => setTitle(event.target.value);

  const textChangeHandler = (event) => {
    setText(event.target.value);
    setIsActiveForm(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!edit) {
      title &&
        text &&
        props.addNote({
          id: uid(),
          title,
          text,
          backgroundColor: "white",
          pinned: false,
        });
      setIsActiveForm(false);
    } else {
      props.editNote({
        ...selectedNote,
        id: selectedNote.id,
        title,
        text,
      });
      toggleModal();
    }

    setTitle("");
    setText("");
  };

  // If you want to store the form data in an object (some codebases use this method)
  // const [userInput, setUserInput] = useState({
  //   title: "",
  //   text: "",
  // });

  // Updating state in the correct manner, using prevState

  // Incorrect way:
  // const titleChangeHandler = (event) => setUserInput({
  //   ...userInput,
  //   title: event.target.value,
  // })

  // correct way:
  // const titleChangeHandler = (event) =>
  //   setUserInput((prevState) => {
  //     return {
  //       ...prevState,
  //       title: event.target.value,
  //     };
  //   });

  // const textChangeHandler = (event) =>
  //   setUserInput((prevState) => {
  //     return {
  //       ...prevState,
  //       text: event.target.value,
  //     };
  //   });

  // const submitFormHandler = (event) => {
  //   event.preventDefault();
  //   // will add data to array
  //   setUserInput({
  //     title: "",
  //     text: "",
  //   });
  // };

  const formClickHandler = () => {
    // create a state & update it
    if (!isActiveForm) {
      setIsActiveForm(true);
    }
  };

  return (
    // based on the state, output the correct form
    <div>
      <div
        className={`form-container${edit ? " form-container--modal" : ""}${
          !edit && isActiveForm ? " form-container--expanded" : ""
        }`}
        onClick={formClickHandler}
        style={{
          background: edit
            ? resolveNoteColor(selectedNote?.backgroundColor, theme)
            : theme === "dark"
              ? "#202124"
              : "#fff",
        }}
      >
        <form onSubmit={submitFormHandler} className="form">
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              type="text"
              className="note-title"
              placeholder="Title"
            />
          )}

          {isActiveForm ? (
            <>
              <input
                onChange={textChangeHandler}
                value={text}
                type="text"
                className="note-text"
                placeholder="Take a note..."
              />
              <div className="form-actions">
                <div className="icons">
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      palette
                    </span>
                    <span className="tooltip-text">Change Color</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      add_alert
                    </span>
                    <span className="tooltip-text">Remind me</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      person_add
                    </span>
                    <span className="tooltip-text">Collaborator</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      image
                    </span>
                    <span className="tooltip-text">Add Image</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      archive
                    </span>
                    <span className="tooltip-text">Archive</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      more_vert
                    </span>
                    <span className="tooltip-text">More</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      undo
                    </span>
                    <span className="tooltip-text">Undo</span>
                  </div>
                  <div className="tooltip">
                    <span className="material-symbols-outlined hover small-icon">
                      redo
                    </span>
                    <span className="tooltip-text">Redo</span>
                  </div>
                </div>
                <button type="submit" className="close-btn">
                  Close
                </button>
              </div>
            </>
          ) : (
            <div className="form-inline">
              <input
                onChange={textChangeHandler}
                value={text}
                type="text"
                className="note-text note-text-inline"
                placeholder="Take a note..."
              />
              <div className="inline-actions">
                <div className="tooltip">
                  <span className="material-symbols-outlined hover">
                    check_box
                  </span>
                  <span className="tooltip-text">New List</span>
                </div>
                <div className="tooltip">
                  <span className="material-symbols-outlined hover">brush</span>
                  <span className="tooltip-text">New Drawing</span>
                </div>
                <div className="tooltip">
                  <span className="material-symbols-outlined hover">image</span>
                  <span className="tooltip-text">New Image</span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
