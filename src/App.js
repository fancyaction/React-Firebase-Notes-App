import React, { Component } from 'react';
import Note from './Note/Note';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>React & Firebase To-Do List</h1>;
        <Note />
      </div>
    );
  }
}
