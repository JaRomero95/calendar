import React from 'react';
import {shallow} from 'enzyme';
import {AppFooter} from 'components/general/AppFooter';

describe('AppFooter', () => {
  it('renders without crashing', () => {
    shallow(<AppFooter />);
  });
});
