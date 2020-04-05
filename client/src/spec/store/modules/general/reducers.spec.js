import * as actions from 'store/modules/general/actions';
import reducer from 'store/modules/general/reducers';

describe('General reducers', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      loading: false,
    });
  });

  it('SET_LOADING', () => {
    expect(reducer(undefined, actions.setLoading(true))).toEqual(
      expect.objectContaining({
        loading: true,
      }),
    );
  });
});
