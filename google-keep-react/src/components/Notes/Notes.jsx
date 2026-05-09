import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const {
    notes,
    deleteNote,
    toggleModal,
    setSelectedNote,
    editNote,
    reorderNotes,
  } = props;

  const [activeId, setActiveId] = useState(null);
  const activeNote = activeId
    ? notes.find((n) => n.id === activeId)
    : null;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event) => setActiveId(event.active.id);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      reorderNotes(active.id, over.id);
    }
  };
  const handleDragCancel = () => setActiveId(null);

  if (notes.length === 0) {
    return (
      <div className="notes">
        <p>Notes you add appear here.</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={notes.map((n) => n.id)}
        strategy={rectSortingStrategy}
      >
        <div className="notes">
          {notes.map((note) => (
            <Note
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              toggleModal={toggleModal}
              setSelectedNote={setSelectedNote}
              editNote={editNote}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeNote ? (
          <Note
            note={activeNote}
            deleteNote={deleteNote}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
            editNote={editNote}
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Notes;
