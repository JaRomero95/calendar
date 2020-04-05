import * as actions from 'store/modules/general/actions';
import reducer from 'store/modules/general/reducers';

describe('General reducers', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
      toast: null,
    });
  });

  it('SET_LOADING', () => {
    expect(reducer(undefined, actions.setLoading(true))).toEqual(
      expect.objectContaining({
        loading: true,
      }),
    );
  });

  it('SET_TOAST', () => {
    const message = 'test toast';

    const state = reducer(undefined, actions.setToast(message));

    expect(state.toast).toEqual(
      expect.objectContaining({
        message,
        setAt: expect.any(Number),
      }),
    );
  });
});
