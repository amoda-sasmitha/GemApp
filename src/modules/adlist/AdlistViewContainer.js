// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AdlistView from './AdlistView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(AdlistView);
