import { addField } from '../reducers/tables/actions';
import { connect } from 'react-redux';
import { showModal } from '../reducers/modal/actions';
import { tableDrag } from '../reducers/tables/actions';

import Table from './Table';

const mapStateToProps = ({ tables, modal }) => ({
  tables,
  modal
});

const mapDispatchToProps = () => dispatch => ({
  createField: (tableName) => {
    dispatch(addField(tableName));
  },
  showModal: (table, tablename) => {
    dispatch(showModal(table, tablename));
  },
  onDrag: (table, tablename, ref) => {
    dispatch(tableDrag(table, tablename, ref));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
