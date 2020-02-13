// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import NewsView from './NewsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(NewsView);
