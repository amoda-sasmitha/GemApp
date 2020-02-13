// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import NewsListView from './NewsListView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(NewsListView);
