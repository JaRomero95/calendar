import * as selectors from 'store/modules/general/selectors';

describe('General selectors', () => {
  const toast = {
    message: 'test toast',
    setAt: 123,
  };

  const state = {
    general: {
      loading: true,
      toast,
    },
  };

  it('isLoading', () => {
    expect(selectors.isLoading(state)).toEqual(true);
  });

  it('getToast', () => {
    expect(selectors.getToast(state)).toEqual(toast);
  });
});
