import {
    FETCH_REPOS_BEGIN,
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_PROFILE
  } from './reposActions';
  
  const initialState = {
    repos: [],
    loading: false,
    error: null,
    currentUser: {}
  };
  
  export default function reposReducer(state = initialState, action) {
    switch(action.type) {
      case FETCH_REPOS_BEGIN:
        // Mark the state as "loading" so we can show a spinner or something
        // Also, reset any errors. We're starting fresh.
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_REPOS_SUCCESS:
        // All done: set loading "false".
        // Also, replace the repos with the ones from the server
        return {
          ...state,
          loading: false,
          repos: action.payload
        };
  
      case FETCH_REPOS_FAILURE:
        // The request failed. It's done. So set loading to "false".
        // Save the error, so we can display it somewhere.
        // Since it failed, we don't have repos to display anymore, so set `repos` empty.
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          repos: []
        };
        
        case FETCH_PROFILE: 
        return {
            ...state,
            currentUser: action.payload
        }
      default:
        // ALWAYS have a default case in a reducer
        return state;
    }
  }