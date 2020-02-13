/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import {
  ServiceCard,
} from '../index';

describe('ServiceCard Component', () => {
  it('renders as expected', () => {
  const wrapper = shallow(
    <ServiceCard />,
  );
  expect(wrapper).toMatchSnapshot();
});
