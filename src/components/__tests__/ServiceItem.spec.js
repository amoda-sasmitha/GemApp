/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  ServiceItem,
} from '../index';

describe('ServiceItem Component', () => {
  it('renders as expected', () => {
  const wrapper = shallow(
    <ServiceItem />,
  );
  expect(wrapper).toMatchSnapshot();
});
