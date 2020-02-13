// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import EmailVerifyView from './EmailVerifyView';

export default compose(
  connect() )(EmailVerifyView);
