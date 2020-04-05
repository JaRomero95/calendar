import React from 'react';
import {shallow} from 'enzyme';
import {AppFormError} from 'components/general/AppFormError';

describe('AppFormError', () => {
  it('renders without crashing', () => {
    shallow(<AppFormError />);
  });
});
