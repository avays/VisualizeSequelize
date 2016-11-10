import { connect } from 'react-redux';

import Grid from './Grid';

const mapStateToProps = ({ gridSize }) => ({
  gridSize
});

export default connect(mapStateToProps, null)(Grid);
