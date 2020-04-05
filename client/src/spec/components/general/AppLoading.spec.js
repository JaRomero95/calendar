import React from 'react';
import {shallow} from 'enzyme';
import {AppLoading} from 'components/general/AppLoading';

const basicProps = {
  isLoading: true,
};

describe('AppLoading', () => {
  it('renders without crashing', () => {
    shallow(<AppLoading {...basicProps} />);
  });

  it('renders html when isLoading', () => {
    const wrapper = shallow(<AppLoading isLoading />);

    expect(wrapper.isEmptyRender()).not.toBeTruthy();
  });

  it('renders null when not isLoading', () => {
    const wrapper = shallow(<AppLoading isLoading={false} />);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });
});
