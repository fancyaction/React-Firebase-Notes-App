import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);

    this.state = {
      // setup React state of component
      notes: [
        { id: 1, noteContent: 'Note 1 here!' },
        { id: 2, noteContent: 'Note 2 here!' }
      ]
    };
  }

  // add new note to array
  addNote(note) {
    const prevNotes = this.state.notes;
    prevNotes.push({ id: prevNotes.length + 1, noteContent: note });

    this.setState({
      notes: prevNotes
    });
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
              />
            );
          })}
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}
