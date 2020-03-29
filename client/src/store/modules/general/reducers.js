import * as types from './types';
import createReducer from '../../createReducer';

const initialState = {
  loading: false,
};

const reducer = createReducer(initialState)({
  [types.SET_LOADING]: (state, {value}) => ({
    ...state,
    loading: value,
  }),
});

export default reducer;
