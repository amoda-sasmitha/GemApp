// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ResetPasswordView from './ResetPasswordView';

export default compose(
  connect() )(ResetPasswordView);
