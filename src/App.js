import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './App.css';
import '../public/stylesheets/style.css'
import Canvas from './Canvas/CanvasContainer';
import Sidebar from './Sidebar/Sidebar';
import { Grid, Col, Row } from 'react-bootstrap';
import TableModal from './TableModal/TableModalContainer';
import CodePane from './CodePane/CodePaneContainer';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={2} md={2} lg={2}>
            <Sidebar />
          </Col>
          <Col sm={8} md={8} lg={8} className="canvas">
            <Canvas />
            (this.props.modal.show && <TableModal />)
          </Col>
          <Col sm={2} md={2} lg={2}>
            <CodePane />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
