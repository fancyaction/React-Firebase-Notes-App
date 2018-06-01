import React, { Component } from 'react';
import './NoteForm.css';

export default class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ''
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  // when user input changes, set newNoteContent
  // to value of input box contents
  handleUserInput(ev) {
    this.setState({
      newNoteContent: ev.target.value // value of text input
    });
  }

  // sets noteContent for note to input's value
  writeNote() {
    this.props.addNote(this.state.newNoteContent);
    // set newNoteContent back to empty string
    this.setState({
      newNoteContent: ''
    });
  }

  render() {
    return (
      <div className="formWrapper">
        <input
          className="noteInput"
          placeholder="Write a new note."
          value={this.state.newNoteContent}
          onChange={this.handleUserInput}
        />
        <button className="noteButton" onClick={this.writeNote}>
          Add note
        </button>
      </div>
    );
  }
}
