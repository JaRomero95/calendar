import React from 'react';
import {shallow} from 'enzyme';
import {AppForceSubmit} from 'components/general/AppForceSubmit';

describe('AppForceSubmit', () => {
  it('renders without crashing', () => {
    shallow(<AppForceSubmit />);
  });
});
