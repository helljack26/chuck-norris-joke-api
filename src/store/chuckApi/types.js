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
    // const state = getState();
    // const searchFilm = state.filmApi.searchFilm;
    // const filmList = state.filmApi.filmList;

    const urlArray = {
        random: 'https://api.chucknorris.io/jokes/random'
        // search: `https://api.themoviedb.org/3/search/movie?api_key=4d0c68776909a3f926088d7ddf14c097&query=${searchFilm}`
    }
    // let url
    // if (!searchFilm) {
    //     url = urlArray.random
    // } else {
    //     url = urlArray.search
    // }
    await fetch(urlArray.random)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const modifiedData = !data.errors ? checkInFavoriteList(data, dispatch) : null;
            return (dispatch(setJokeFromApi(modifiedData))
                // ,
                // modifiedData.length === 0 ? (dispatch(updatePageTitle(`Nothing was found for "${searchFilm}"`)),
                //     dispatch(setJokeFromApi(filmList)))
                //     : null
            )
        })
}

export const checkInFavoriteList = (results, dispatch) => {

    // Save necessary film fields
    const modifiedData = results.map((item) => {
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
export const toWatchList = (title, image, genre, id) => async (dispatch, getState) => {
    const state = getState();
    const watchList = state.filmApi.watchList;

    let actionType
    if (title === undefined && image === undefined && genre === undefined) {
        actionType = 'remove'
    } else {
        actionType = 'add'
        const newInWatchItem = {
            name: title,
            poster_path: image,
            genre_ids: genre,
            id: id,
            inWatch: true
        }
        watchList.push(newInWatchItem)
    }
    function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()]
    }
    function deleteUniqueFromList(arr, key) {
        return arr.filter((item) => {
            return item.id !== key;
        });
    }
    const cleanWatchList = actionType !== 'add' ? deleteUniqueFromList(watchList, id) : getUniqueListBy(watchList, 'id');
    localStorage.setItem('watchList', JSON.stringify(cleanWatchList))
    return dispatch(setFavoriteJokeList(cleanWatchList))
}

