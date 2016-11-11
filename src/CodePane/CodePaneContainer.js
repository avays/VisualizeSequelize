import { connect } from 'react-redux';

import CodePane from './CodePane';

const mapStateToProps = ({ tables }) => ({
  tables
});

export default connect(mapStateToProps, null)(CodePane);
