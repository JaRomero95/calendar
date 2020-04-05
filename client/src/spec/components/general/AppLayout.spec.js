import React from 'react';
import {shallow} from 'enzyme';
import {AppLayout} from 'components/general/AppLayout';

describe('AppLayout', () => {
  it('renders without crashing', () => {
    shallow(<AppLayout />);
  });
});
