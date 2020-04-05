import * as types from './types';

const setLoading = value => ({
  type: types.SET_LOADING,
  value,
});

const setToast = message => ({
  type: types.SET_TOAST,
  message,
  setAt: new Date().getTime(),
});

export {
  setToast,
  setLoading,
};
