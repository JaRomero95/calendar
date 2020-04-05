import React from 'react';
import {shallow} from 'enzyme';
import {AppToast} from 'components/general/AppToast';

describe('AppToast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppToast />);
  });

  it('renders nothing by default', () => {
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders message', () => {
    const expectedMessage = 'test toast';

    wrapper.setProps({toast: {message: expectedMessage, setAt: 1}});

    expect(wrapper.text()).toContain(expectedMessage);
  });

  it('update message when setAt change', () => {
    const newMessage = 'test two';

    wrapper.setProps(
      {toast: {message: 'test one', setAt: 1}},
      () => wrapper.setProps({toast: {message: newMessage, setAt: 2}}),
    );

    expect(wrapper.text()).toContain(newMessage);
  });
});
