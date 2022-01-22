export const SET_CATEGORIES_LIST = 'SET_CATEGORIES_LIST';
export const SET_JOKE_LIST = 'SET_JOKE_LIST';
export const UPDATE_SEARCH_JOKE = 'UPDATE_SEARCH_JOKE';
export const UPDATE_CATEGORY_JOKE = 'UPDATE_CATEGORY_JOKE';
export const SET_FAVORITE_JOKE_LIST = 'SET_FAVORITE_JOKE_LIST';

export const setCategoriesFromApi = (payload) => {
    return { type: SET_CATEGORIES_LIST, payload }
}
export const setJokeFromApi = (payload) => {
    return { type: SET_JOKE_LIST, payload }
}
export const updateSearchJoke = (payload) => {
    return { type: UPDATE_SEARCH_JOKE, payload }
}
export const updateCategoryJoke = (payload) => {
    return { type: UPDATE_CATEGORY_JOKE, payload }
}
export const setFavoriteJokeList = (payload) => {
    return { type: SET_FAVORITE_JOKE_LIST, payload }
}

export const getCategoriesFromApi = () => async (dispatch) => {
    const urlCategories = 'https://api.chucknorris.io/jokes/categories'
    await fetch(urlCategories)
        .then((response) => response.json())
        .then((data) => {
            return (dispatch(setCategoriesFromApi(data))
            )
        })
}

export const getJokeListFromApi = () => async (dispatch, getState) => {
    const state = getState();
    const searchCategory = state.chuckApi.searchCategory;
    const searchJoke = state.chuckApi.searchJoke;
    const url = {
        random: 'https://api.chucknorris.io/jokes/random',
        category: `https://api.chucknorris.io/jokes/random?category=${searchCategory}`,
        query: `https://api.chucknorris.io/jokes/search?query=${searchJoke}`
    }
    let queryUrl
    if (!searchCategory && !searchJoke) {
        queryUrl = url.random
    } else if (searchJoke && !searchCategory) {
        queryUrl = url.query
    } else {
        queryUrl = url.category
    }
    await fetch(queryUrl)
        .then((response) => response.json())
        .then((data) => {
            if (!!data.total === false && !!data.id !== true) {
                return
            } else if (!!data.error === true) {
                return
            } else {
                const modifiedData = checkInFavoriteList(data, dispatch, getState);
                return (dispatch(setJokeFromApi([])),
                    dispatch(setJokeFromApi(modifiedData)))
            }
        })
}

export const checkInFavoriteList = (results, dispatch, getState) => {
    const state = getState();
    const favoriteJokeList = state.chuckApi.favoriteJokeList;
    let modifiedArray = []
    if (results.result !== undefined) {
        results.result.map((item) => {
            return modifiedArray.push(item)
        })
    } else {
        modifiedArray.push(results)
    }
    const modifiedData = modifiedArray.map((item) => {
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
    let checkType = favoriteJokeList === null ? 'initial' : 'compare with favoriteList'

    function checkInFavoriteList(item) {
        const jokesFavoriteList = favoriteJokeList.find(jokes => jokes.id === item.id)
        return Boolean(jokesFavoriteList) === true ? jokesFavoriteList : item;
    }
    switch (checkType) {
        case 'initial':
            return modifiedData
        case 'compare with favoriteList':
            dispatch(setFavoriteJokeList(favoriteJokeList))
            return modifiedData.map((item) => {
                return checkInFavoriteList(item)
            })
        default:
            return modifiedData
    }
}


export const toFavoriteList = (categories, icon_url, id, updated_at, url, value, remove) => async (dispatch, getState) => {
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

