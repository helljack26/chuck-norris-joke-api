export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
export const SET_JOKE_LIST = 'SET_JOKE_LIST';
export const UPDATE_SEARCH_BY_INPUT = 'UPDATE_SEARCH_BY_INPUT';
export const UPDATE_CATEGORY_JOKE = 'UPDATE_CATEGORY_JOKE';
export const SET_FAVORITE_LIST_STATE = 'SET_FAVORITE_LIST_STATE';
export const SET_FAVORITE_JOKE_LIST = 'SET_FAVORITE_JOKE_LIST';

export const setCategoriesFromApi = (payload) => {
    return { type: SET_CATEGORIES_LIST, payload }
}
export const setJokeFromApi = (payload) => {
    return { type: SET_JOKE_LIST, payload }
}
export const updateSearchByInput = (payload) => {
    return { type: UPDATE_SEARCH_BY_INPUT, payload }
}
export const updateCategoryJoke = (payload) => {
    return { type: UPDATE_CATEGORY_JOKE, payload }
}
export const setFavoriteListState = (payload) => {
    return { type: SET_FAVORITE_LIST_STATE, payload }
}
export const setFavoriteJokeList = (payload) => {
    return { type: SET_FAVORITE_JOKE_LIST, payload }
}

export const getCategoriesFromApi = () => (dispatch) => {
    const urlCategories = 'https://api.chucknorris.io/jokes/categories'
    fetch(urlCategories)
        .then((response) => response.json())
        .then((data) => {
            return (dispatch(setCategoriesFromApi(data))
            )
        })
}

export const getJokeListFromApi = () => (dispatch, getState) => {
    const state = getState();
    const searchCategory = state.chuckApi.searchCategory;
    const searchByInput = state.chuckApi.searchByInput;
    const url = {
        random: 'https://api.chucknorris.io/jokes/random',
        category: `https://api.chucknorris.io/jokes/random?category=${searchCategory}`,
        byInput: `https://api.chucknorris.io/jokes/search?query=${searchByInput}`
    }
    const isRandom = Boolean(!searchCategory && !searchByInput);
    const isByInput = Boolean(searchByInput && !searchCategory);

    const queryUrl = isRandom ? url.random : isByInput ? url.byInput : url.category
    fetch(queryUrl)
        .then((response) => response.json())
        .then((data) => {
            const isError = !!data.total === false && !!data.id !== true && !!data.error === true;
            if (!isError) {
                const checkedData = checkInFavoriteList(data, dispatch, getState)
                return (dispatch(setJokeFromApi([])), dispatch(setJokeFromApi(checkedData)))
            }
        })
}

export const checkInFavoriteList = (results, dispatch, getState) => {
    const state = getState();
    const favoriteJokeList = state.chuckApi.favoriteJokeList;

    const isResultsResult = Boolean(results.result !== undefined);
    const correctResults = isResultsResult === true ? results.result : [results];

    const modifiedData = correctResults.map((item) => {
        const { categories, icon_url, id, updated_at, url, value } = item;
        const modifiedDataItem = {
            categories: !categories ? '' : categories,
            icon_url: !icon_url ? '' : icon_url,
            id: id,
            updated_at: updated_at,
            url: url,
            value: value,
            inFavorite: false
        }
        return modifiedDataItem
    })
    const checkInStateFavoriteList = (item) => {
        const foundJoke = favoriteJokeList.find(jokes => jokes.id === item.id)
        return Boolean(foundJoke) === true ? foundJoke : item;
    }
    const isFavoriteJokeList = Boolean(favoriteJokeList === null)
    return isFavoriteJokeList ? modifiedData :
        (dispatch(setFavoriteJokeList(favoriteJokeList)),
            modifiedData.map((item) => checkInStateFavoriteList(item)))
}

export const toFavoriteList = (categories, icon_url, id, updated_at, url, value, remove) => (dispatch, getState) => {
    const state = getState();
    const favoriteJokeList = state.chuckApi.favoriteJokeList;
    const jokeList = state.chuckApi.jokeList;

    const checkFavoriteList = !!favoriteJokeList.find(joke => joke.id === id)
    const checkJokeList = !!jokeList.find(joke => joke.id === id)
    if (remove === true) {
        if (checkJokeList === false) {
            favoriteJokeList.find(joke => joke.id === id).inFavorite = false;
        } else if (checkJokeList === true) {
            favoriteJokeList.find(joke => joke.id === id).inFavorite = false;
            jokeList.find(joke => joke.id === id).inFavorite = false;
        } else {
            return
        }
    } else {
        if (checkFavoriteList === true && checkJokeList === true) {
            favoriteJokeList.find(joke => joke.id === id).inFavorite = true;
            jokeList.find(joke => joke.id === id).inFavorite = true;
        } else {
            if (checkJokeList === true) {
                jokeList.find(joke => joke.id === id).inFavorite = true;
                const newInFavoriteItem = {
                    categories: categories,
                    icon_url: icon_url,
                    id: id,
                    updated_at: updated_at,
                    url: url,
                    value: value,
                    inFavorite: true
                }
                favoriteJokeList.unshift(newInFavoriteItem)
            }
            favoriteJokeList.find(joke => joke.id === id).inFavorite = true;
        }
    }

    localStorage.setItem('favoriteList', JSON.stringify(favoriteJokeList))
    dispatch(setJokeFromApi([]))
    dispatch(setJokeFromApi(jokeList))
    dispatch(setFavoriteJokeList([]))
    dispatch(setFavoriteJokeList(favoriteJokeList))
    return
}

