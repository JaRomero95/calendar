import React from 'react';
import {shallow} from 'enzyme';
import {AppCalendar} from 'components/general/AppCalendar';

describe('AppCalendar', () => {
  it('renders without crashing', () => {
    shallow(<AppCalendar />);
  });
});
