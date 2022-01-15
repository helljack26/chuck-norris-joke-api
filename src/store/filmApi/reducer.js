import {
    SET_FILM_LIST,
    UPDATE_PAGE_TITLE,
    UPDATE_SEARCH_FILM,
    SET_FILM_DETAILS,
    SET_WATCH_LIST,
    SET_LOADING
} from './types';

export const filmApi = (
    state = {
        filmList: [],
        filmPageTitle: '',
        searchFilm: '',
        filmDetails: [],
        watchList: [],
        loading: true
    }, action,) => {
    switch (action.type) {
        case SET_FILM_LIST:
            return { ...state, filmList: action.payload };
        case UPDATE_PAGE_TITLE:
            return { ...state, filmPageTitle: action.payload };
        case UPDATE_SEARCH_FILM:
            return { ...state, searchFilm: action.payload };
        case SET_FILM_DETAILS:
            return { ...state, filmDetails: action.payload };
        case SET_WATCH_LIST:
            return { ...state, watchList: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};


