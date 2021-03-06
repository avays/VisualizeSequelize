import { connect } from 'react-redux';

import App from './App';
import { addTable } from './reducers/tables/actions';

const mapStateToProps = ({ tables, modal }) => ({
  tables,
  modal
});

const mapDispatchToProps = () => dispatch => ({
  createTable: (name) => {
    dispatch(addTable(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
