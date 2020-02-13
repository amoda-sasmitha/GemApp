// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import OnBoardingView from './OnBoardingView';

export default compose(
  connect() )(OnBoardingView);
