import { addField } from '../reducers/tables/actions';
import { connect } from 'react-redux';

import Table from './Table';

const mapStateToProps = ({ fields, props }, {tableId}) => ({
  fields,
  props,
  tableId
});

const mapDispatchToProps = () => dispatch => ({
  createField: (tableName) => {
    dispatch(addField(tableName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
