import { connect } from 'react-redux';

import Table from './Table';

const mapStateToProps = ({ tables }, { name }) => ({
  table: tables.filter(table => table.name === name)[0]
});

export default connect(mapStateToProps, null)(Table);
