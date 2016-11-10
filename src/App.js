import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import logo from './logo.svg';
import './App.css';
import '../public/stylesheets/style.css'
import Canvas from './Canvas/CanvasContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Canvas />
        <button onClick={() => this.props.createTable('test')}>Add testing table</button>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
