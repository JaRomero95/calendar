import * as types from './types';
import createReducer from '../../createReducer';

const initialState = {
  events: [],
};

const reducer = createReducer(initialState)({
  [types.SET_EVENTS]: (state, action) => {
    return {
      ...state,
      events: action.payload,
    };
  },
});

export default reducer;
