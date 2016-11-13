import { connect } from 'react-redux';
import { showModal } from '../reducers/modal/actions';

import CodePane from './CodePane';

const mapStateToProps = ({ tables, modal }) => ({
  tables,
  modal
});

const mapDispatchToProps = () => dispatch => ({
  openModal: () => {
    dispatch(showModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CodePane);
