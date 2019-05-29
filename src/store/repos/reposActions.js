import axios from 'axios';

export const FETCH_REPOS_BEGIN = 'FETCH_REPOS_BEGIN';
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';

export const FETCH_PROFILE = 'FETCH_PROFILE';


export const fetchReposBegin = () => ({
    type: FETCH_REPOS_BEGIN
});

export const fetchReposSuccess = repos => ({
    type: FETCH_REPOS_SUCCESS,
    payload: repos
});

export const fetchReposFailure = error => ({
    type: FETCH_REPOS_FAILURE,
    payload: error
});

export function fetchRepos(username, sortBy = 'full_name') {
    let config = {
        method: "get",
        url: `https://api.github.com/users/${username}/repos?sort=${sortBy}&per_page=10&page=1`,
        timeout: 60000
    }

    return (dispatch) => {
        dispatch(fetchReposBegin())
        return axios(config).then((response) =>
            dispatch(fetchReposSuccess(response.data))
        ).catch(error =>
            dispatch(fetchReposFailure(error))
        );
    }
}
    
export function fetchProfile(username) {
    let config = {
        method: "get",
        url:  `https://api.github.com/users/${username}`,
        timeout: 60000
    }

    return (dispatch) => {
        return axios(config).then((response) =>
            dispatch({
                type   : FETCH_PROFILE,
                payload: response.data
            })
        )
    }

}