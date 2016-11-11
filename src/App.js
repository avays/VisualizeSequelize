import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import '../public/stylesheets/style.css'
import Canvas from './Canvas/CanvasContainer';
import Sidebar from './Sidebar/Sidebar';
import { Grid, Col, Row } from 'react-bootstrap';
import TableModal from './TableModal/TableModalContainer';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col sm={2} md={2} lg={2}>
            <Sidebar />
          </Col>
          <Col sm={7} md={7} lg={7}>
            <Canvas />
            <button onClick={() => this.props.createTable('test')}>Add testing table</button>
            <TableModal />
          </Col>
          <Col sm={3} md={3} lg={3}>
            code
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
