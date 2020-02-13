// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import EditProfileView from './EditProfileView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(EditProfileView);
