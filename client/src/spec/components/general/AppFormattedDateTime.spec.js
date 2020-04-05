import React from 'react';
import {shallow} from 'enzyme';
import {callChildProp, getChildProp} from 'spec/support/finders';
import {AppFormattedDateTime} from 'components/general/AppFormattedDateTime';

const basicProps = {
  date: '2000-01-01T20:00:00.000Z',
};

describe('AppFormattedDateTime', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AppFormattedDateTime {...basicProps} />);
  });

  it('send date to FormattedDate', () => {
    expect(getChildProp(wrapper, 'FormattedDate', 'value')).toEqual(basicProps.date);
  });

  it('send date to FormattedTime', () => {
    expect(getChildProp(wrapper, 'FormattedTime', 'value')).toEqual(basicProps.date);
  });
});
