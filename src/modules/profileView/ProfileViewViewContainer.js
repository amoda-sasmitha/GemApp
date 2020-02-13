// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ProfileViewView from './ProfileViewView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(ProfileViewView);
