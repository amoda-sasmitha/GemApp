// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AdvertisementView from './AdvertisementView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AdvertisementView);
