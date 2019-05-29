
import once from '../../utils/once';

export const FETCH_PROFILES_BEGIN = 'FETCH_PROFILES_BEGIN';
export const FETCH_PROFILES_SUCCESS = 'FETCH_PROFILES_SUCCESS';
export const FETCH_PROFILES_FAILURE = 'FETCH_PROFILES_FAILURE';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';
export const SET_NEXT_PAGE = 'SET_NEXT_PAGE';
export const SET_PREV_PAGE = 'SET_PREV_PAGE';

export const fetchProfilesBegin = () => ({
  type: FETCH_PROFILES_BEGIN
});

export const fetchProfilesSuccess = profiles => ({
  type: FETCH_PROFILES_SUCCESS,
  payload: profiles
});

export const fetchProfilesFailure = error => ({
  type: FETCH_PROFILES_FAILURE,
  payload: { error }
});

export function fetchProfiles(searchText, currentPage = 1, pageSize = 10) {
  let config = {
    method: "get",
    url: `https://api.github.com/search/users?q=${searchText}&per_page=${pageSize}&page=${currentPage}`,
    timeout: 60000
  }

  return (dispatch) => {
    dispatch(fetchProfilesBegin())
    return once(config).then((response) =>
      dispatch(fetchProfilesSuccess(response.data))
    ).catch(error => {
      if (error && error.response) {
        dispatch(fetchProfilesFailure(error.response.data))
      }
    });
  }
}

export function setSearchText(e) {
  return {
      type: SET_SEARCH_TEXT,
      payload: e.target.value
  }
}

export function setNextPage(e) {
  return {
      type: SET_NEXT_PAGE
  }
}

export function setPrevPage(e) {
  return {
    type: SET_PREV_PAGE
  }
}
