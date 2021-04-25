import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../utils";

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
};

const fetchStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const fetchSuccess = (state, action) => {
  return updateObject(state, {
    items: action.items,
    filteredItems: action.items,
    loading: false,
    error: null,
  });
};

const fetchFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};

const setFiltered = (state, action) => {
  return updateObject(state, {
    filteredItems: action.filteredItems,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_START:
      return fetchStart(state, action);
    case actionTypes.FETCH_SUCCESS:
      return fetchSuccess(state, action);
    case actionTypes.FETCH_FAIL:
      return fetchFail(state, action);
    case actionTypes.SET_FILTERED:
      return setFiltered(state, action);
    default:
      return state;
  }
};

export default reducer;
