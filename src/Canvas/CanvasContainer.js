import { connect } from 'react-redux';

import Canvas from './Canvas';

const mapStateToProps = ({ tables, fields }) => ({
  tables,
  fields
});

export default connect(mapStateToProps, null)(Canvas);
