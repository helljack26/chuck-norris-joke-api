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
    // localStorage.clear()
    const state = getState();
    const searchCategory = state.chuckApi.searchCategory;
    const searchJoke = state.chuckApi.searchJoke;
    const urlArray = {
        random: 'https://api.chucknorris.io/jokes/random',
        category: `https://api.chucknorris.io/jokes/random?category=${searchCategory}`,
        query: `https://api.chucknorris.io/jokes/search?query=${searchJoke}`
    }
    let url
    if (!searchCategory && !searchJoke) {
        url = urlArray.random
    } else if (searchJoke && !searchCategory) {
        url = urlArray.query
    } else {
        url = urlArray.category
    }
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (!!data.total === false && !!data.id !== true) {
                return
            } else if (!!data.error === true) {
                return
            } else {
                const modifiedData = checkInFavoriteList(data, dispatch);
                return dispatch(setJokeFromApi(modifiedData))
            }
        })
}

export const checkInFavoriteList = (results, dispatch) => {
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
    let checkType
    const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
    const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)
    localStorageFavoriteList === null ? checkType = 'initial' : checkType = 'compare with localStorage'

    function checkInLocalStorage(item) {
        const jokesFromLocalStorage = localStorageFavoriteListJson.find(jokes => jokes.id === item.id)
        return Boolean(jokesFromLocalStorage) === true ? jokesFromLocalStorage : item;
    }
    switch (checkType) {
        case 'initial':
            return modifiedData
        case 'compare with localStorage':
            dispatch(setFavoriteJokeList(localStorageFavoriteListJson))
            return modifiedData.map((item) => {
                return checkInLocalStorage(item)
            })
        default:
            return modifiedData
    }
}
export const toFavoriteList = (categories, icon_url, id, updated_at, url, value) => async (dispatch, getState) => {
    const state = getState();
    const favoriteJokeList = state.chuckApi.favoriteJokeList;
    const jokeList = state.chuckApi.jokeList;
    let actionType
    if (value === undefined && id !== undefined) {
        actionType = 'remove'
    } else {
        actionType = 'add'
        const newInFavoriteItem = {
            categories: categories,
            icon_url: icon_url,
            id: id,
            updated_at: updated_at,
            url: url,
            value: value,
            inFavorite: true
        }
        console.log(favoriteJokeList);
        favoriteJokeList.push(newInFavoriteItem)
    }
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    function deleteUniqueFromList(arr, key) {
        return arr.filter((item) => {
            return item.id !== key;
        });
    }
    const cleanFavoriteList = actionType !== 'add' ? deleteUniqueFromList(favoriteJokeList, id) : getUniqueListBy(favoriteJokeList, 'id');
    const cleanJokeList = actionType === 'remove' ? deleteUniqueFromList(jokeList, id) : jokeList;
    console.log(cleanJokeList);
    dispatch(setJokeFromApi(cleanJokeList))
    localStorage.setItem('favoriteList', JSON.stringify(cleanFavoriteList))
    return dispatch(setFavoriteJokeList(cleanFavoriteList))
}

