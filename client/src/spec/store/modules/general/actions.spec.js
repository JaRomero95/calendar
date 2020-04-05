import * as actions from 'store/modules/general/actions';
import * as types from 'store/modules/general/types';

describe('General actions', () => {
  it('setLoading', () => {
    const expectedAction = {
      type: types.SET_LOADING,
      value: true,
    };

    expect(actions.setLoading(true)).toEqual(expectedAction);
  });

  it('setToast', () => {
    const message = 'test toast';

    const expectedAction = {
      type: types.SET_TOAST,
      message,
      setAt: expect.any(Number),
    };

    expect(actions.setToast(message)).toEqual(expectedAction);
  });
});
