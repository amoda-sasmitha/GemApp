// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AddAdvertisementView from './AddAdvertisementView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AddAdvertisementView);
