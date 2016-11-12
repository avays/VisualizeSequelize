import { connect } from 'react-redux';
import { addTable } from '../reducers/tables/actions';
import { hideModal } from '../reducers/modal/actions';

import TableModal from './TableModal';

const mapStateToProps = ({ tables, modal }) => ({
  modal,
  tables
});

const mapDispatchToProps = () => dispatch => ({
  createTable: (tableId, name) => {
    dispatch(addTable(tableId, name));
  },
  closeModal: () => {
    dispatch(hideModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TableModal);
