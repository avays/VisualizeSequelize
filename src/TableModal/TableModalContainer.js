import { connect } from 'react-redux';
import { addTable } from '../reducers/tables/actions';
import { hideModal } from '../reducers/modal/actions';

import TableModal from './TableModal';

const mapStateToProps = ({ modal }) => ({
  modal
});

const mapDispatchToProps = () => dispatch => ({
  createTable: (name) => {
    dispatch(addTable(name));
  },
  closeModal: () => {
    dispatch(hideModal());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TableModal);
