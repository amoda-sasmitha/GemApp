// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AddNewsView from './AddNewsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AddNewsView);
