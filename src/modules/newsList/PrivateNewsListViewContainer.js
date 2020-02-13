// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PrivateNewsListView from './PrivateNewsListView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(PrivateNewsListView);
