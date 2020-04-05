import * as selectors from 'store/modules/general/selectors';

describe('General selectors', () => {
  const state = {
    general: {
      loading: true,
    },
  };

  it('isLoading', () => {
    expect(selectors.isLoading(state)).toEqual(true);
  });
});
