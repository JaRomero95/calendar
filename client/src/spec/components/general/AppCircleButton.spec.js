import React from 'react';
import {shallow} from 'enzyme';
import {AppCircleButton} from 'components/general/AppCircleButton';

describe('AppCircleButton', () => {
  it('renders without crashing', () => {
    shallow(<AppCircleButton />);
  });
});
