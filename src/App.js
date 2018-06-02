import React, { Component } from 'react';
import Note from './Note/Note';
import NoteForm from './NoteForm/NoteForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app
      .database()
      .ref()
      .child('notes');

    this.state = {
      // setup React state of component
      notes: []
    };
  }

  componentWillMount() {
    const prevNotes = this.state.notes;

    //Data snapshot
    this.database.on('child_added', snap => {
      prevNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });

      this.setState({
        notes: prevNotes
      });
    });

    this.database.on('child_removed', snap => {
      for (let i = 0; i < prevNotes.length; i++) {
        if (prevNotes[i].id === snap.key) {
          prevNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: prevNotes
      });
    });
  }

  // make new note and push data containing noteContent to Firebase
  // id is made by Firebase automatically
  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    this.database.child(noteId).remove();
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
                removeNote={this.removeNote}
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
