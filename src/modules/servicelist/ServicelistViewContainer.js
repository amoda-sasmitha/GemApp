// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ServicelistView from './ServicelistView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(ServicelistView);
