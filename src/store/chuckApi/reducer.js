import {
    SET_CATEGORIES_LIST,
    SET_JOKE_LIST,
    UPDATE_SEARCH_JOKE,
    UPDATE_CATEGORY_JOKE,
    SET_FAVORITE_LIST_STATE,
    SET_FAVORITE_JOKE_LIST
} from './types';

export const chuckApi = (
    state = {
        categoriesList: [],
        jokeList: [],
        searchJoke: '',
        searchCategory: '',
        favoriteListStateBtn: ['desktop', true],
        favoriteJokeList: []
    }, action,) => {
    switch (action.type) {
        case SET_CATEGORIES_LIST:
            return { ...state, categoriesList: action.payload };
        case SET_JOKE_LIST:
            return { ...state, jokeList: action.payload };
        case UPDATE_SEARCH_JOKE:
            return { ...state, searchJoke: action.payload };
        case UPDATE_CATEGORY_JOKE:
            return { ...state, searchCategory: action.payload };
        case SET_FAVORITE_LIST_STATE:
            return { ...state, favoriteListStateBtn: action.payload };
        case SET_FAVORITE_JOKE_LIST:
            return { ...state, favoriteJokeList: action.payload };
        default:
            return state;
    }
};


