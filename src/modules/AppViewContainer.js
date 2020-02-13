import { compose, lifecycle } from 'recompose';
import { Platform, UIManager, StatusBar } from 'react-native';

import AppView from './AppView';

export default compose(
  lifecycle({
    componentWillMount() {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#FFF')
      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    },
  }),
)(AppView);
