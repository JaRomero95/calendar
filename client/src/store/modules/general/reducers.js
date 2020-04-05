import * as types from './types';
import createReducer from '../../createReducer';

const initialState = {
  loading: false,
  toast: null,
};

const reducer = createReducer(initialState)({
  [types.SET_LOADING]: (state, {value}) => ({
    ...state,
    loading: value,
  }),
  [types.SET_TOAST]: (state, {message, setAt}) => ({
    ...state,
    toast: {
      message,
      setAt,
    },
  }),
});

export default reducer;
