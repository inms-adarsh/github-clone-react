import {
    FETCH_PROFILES_BEGIN,
    FETCH_PROFILES_SUCCESS,
    FETCH_PROFILES_FAILURE,
    SET_SEARCH_TEXT,
    SET_NEXT_PAGE,
    SET_PREV_PAGE
} from './profileActions';

const initialState = {
    profiles: [],
    loading: false,
    error: null,
    total_count: 0,
    searchText: '',
    currentPage: 1
};

export default function profilesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROFILES_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_PROFILES_SUCCESS:
            // All done: set loading "false".
            // Also, replace the profiles with the ones from the server
            return {
                ...state,
                loading: false,
                profiles: action.payload.items,
                error: null,
                total_count: action.payload.total_count
            };

        case FETCH_PROFILES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        
        case SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.payload,
                error: null
            }
        }

        case SET_NEXT_PAGE: {
            return {
                ...state,
                currentPage: state.currentPage + 1,
                error: null
            }
        }

        case SET_PREV_PAGE: {
            return {
                ...state,
                currentPage: state.currentPage - 1,
                error: null
            }
        }

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}