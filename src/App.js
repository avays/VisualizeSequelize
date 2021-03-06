import React, { Component } from 'react';
import './App.css';
import '../public/stylesheets/style.css'
import Canvas from './Canvas/CanvasContainer';
import { Grid, Col, Row } from 'react-bootstrap';
import TableModal from './TableModal/TableModalContainer';
import CodePane from './CodePane/CodePaneContainer';

class App extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col sm={8} md={8} lg={8} className="canvas">
            <Canvas />
            {this.props.modal.show && <TableModal />}

          </Col>
          <Col sm={4} md={4} lg={4}>
            <CodePane />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
