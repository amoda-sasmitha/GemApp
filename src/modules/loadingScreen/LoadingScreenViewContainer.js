// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import LoadingScreenView from './LoadingScreenView';

export default compose( connect() )(LoadingScreenView);
