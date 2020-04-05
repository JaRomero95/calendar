import React from 'react';
import {shallow} from 'enzyme';
import {AppSpinner} from 'components/general/AppSpinner';

describe('AppSpinner', () => {
  it('renders without crashing', () => {
    shallow(<AppSpinner />);
  });
});
