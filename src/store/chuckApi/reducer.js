import {
    SET_CATEGORIES_LIST,
    SET_JOKE_LIST,
    UPDATE_SEARCH_BY_INPUT,
    UPDATE_CATEGORY_JOKE,
    SET_RADIO_SEARCH_STATE,
    SET_FAVORITE_LIST_STATE,
    SET_FAVORITE_JOKE_LIST
} from './actions';

export const chuckApi = (
    state = {
        categoriesList: [],
        jokeList: [],
        searchByInput: '',
        searchCategory: '',
        radioSearchState: false,
        favoriteListStateBtn: false,
        favoriteJokeList: []
    }, action,) => {
    switch (action.type) {
        case SET_CATEGORIES_LIST:
            return { ...state, categoriesList: action.payload };
        case SET_JOKE_LIST:
            return { ...state, jokeList: action.payload };
        case UPDATE_SEARCH_BY_INPUT:
            return { ...state, searchByInput: action.payload };
        case UPDATE_CATEGORY_JOKE:
            return { ...state, searchCategory: action.payload };
        case SET_RADIO_SEARCH_STATE:
            return { ...state, radioSearchState: action.payload };
        case SET_FAVORITE_LIST_STATE:
            return { ...state, favoriteListStateBtn: action.payload };
        case SET_FAVORITE_JOKE_LIST:
            return { ...state, favoriteJokeList: action.payload };
        default:
            return state;
    }
};


