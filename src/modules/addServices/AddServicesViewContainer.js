// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AddServicesView from './AddServicesView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AddServicesView);
