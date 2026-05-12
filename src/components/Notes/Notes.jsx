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
    togglePin,
  } = props;

  const [activeId, setActiveId] = useState(null);
  const activeNote = activeId ? notes.find((n) => n.id === activeId) : null;

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

  const pinnedNotes = notes.filter((n) => n.pinned);
  const otherNotes = notes.filter((n) => !n.pinned);
  const hasPinned = pinnedNotes.length > 0;

  const noteProps = {
    deleteNote,
    toggleModal,
    setSelectedNote,
    editNote,
    togglePin,
  };

  const renderList = (list) => (
    <SortableContext
      items={list.map((n) => n.id)}
      strategy={rectSortingStrategy}
    >
      <div className="notes">
        {list.map((note) => (
          <Note key={note.id} note={note} {...noteProps} />
        ))}
      </div>
    </SortableContext>
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {hasPinned && (
        <section className="notes-section">
          <h2 className="notes-section-header">Pinned</h2>
          {renderList(pinnedNotes)}
        </section>
      )}
      {otherNotes.length > 0 && (
        <section className="notes-section">
          {hasPinned && <h2 className="notes-section-header">Others</h2>}
          {renderList(otherNotes)}
        </section>
      )}
      <DragOverlay>
        {activeNote ? (
          <Note note={activeNote} {...noteProps} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Notes;
