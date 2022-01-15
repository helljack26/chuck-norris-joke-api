export const SET_FILM_LIST = 'SET_FILM_LIST';
export const UPDATE_PAGE_TITLE = 'UPDATE_PAGE_TITLE';
export const UPDATE_SEARCH_FILM = 'UPDATE_SEARCH_FILM';
export const SET_FILM_DETAILS = 'SET_FILM_DETAILS';
export const SET_WATCH_LIST = 'SET_WATCH_LIST';
export const SET_LOADING = ' SET_LOADING';

export const setFilmFromApi = (payload) => {
    return { type: SET_FILM_LIST, payload }
}
export const updatePageTitle = (payload) => {
    return { type: UPDATE_PAGE_TITLE, payload }
}
export const updateSearchFilm = (payload) => {
    return { type: UPDATE_SEARCH_FILM, payload }
}
export const setFilmDetails = (payload) => {
    return { type: SET_FILM_DETAILS, payload }
}
export const setWatchList = (payload) => {
    return { type: SET_WATCH_LIST, payload }
}
export const setLoading = (payload) => {
    return { type: SET_LOADING, payload }
}

export const getFilmListFromApi = (reload = false) => async (dispatch, getState) => {
    const state = getState();
    const searchFilm = state.filmApi.searchFilm;
    const filmList = state.filmApi.filmList;
    // Spinner on
    if (searchFilm !== '') {
        dispatch(setLoading(true))
    }
    if (reload === true) {
        dispatch(setLoading(true))
    }
    const urlArray = {
        popular: 'https://api.themoviedb.org/3/trending/movie/day?api_key=4d0c68776909a3f926088d7ddf14c097',
        search: `https://api.themoviedb.org/3/search/movie?api_key=4d0c68776909a3f926088d7ddf14c097&query=${searchFilm}`
    }
    let url
    if (!searchFilm) {
        url = urlArray.popular
        dispatch(updatePageTitle('Popular films'))
    } else {
        url = urlArray.search
        dispatch(updatePageTitle(`Search results for "${searchFilm}"`))
    }
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const modifiedData = !data.errors ? checkInWatchList(data.results, dispatch) : null;
            return (dispatch(setFilmFromApi(modifiedData)),
                modifiedData.length === 0 ? (dispatch(updatePageTitle(`Nothing was found for "${searchFilm}"`)),
                    dispatch(setFilmFromApi(filmList)))
                    : null
            )
        })
    dispatch(updateSearchFilm(''))
    // Spinner off
    setTimeout(() => dispatch(setLoading(false)), 700)
}

export const checkInWatchList = (results, dispatch) => {
    // Save necessary film fields
    const modifiedData = results.map((item) => {
        const { title, name, poster_path, genre_ids, id } = item;
        const modifiedDataItem = {
            name: !title ? name : title,
            poster_path: poster_path,
            genre_ids: genre_ids,
            id: id,
            inWatch: false
        }
        return modifiedDataItem
    })
    let checkType
    const localStorageWatchList = window.localStorage.getItem('watchList')
    const localStorageWatchListJson = JSON.parse(localStorageWatchList)
    localStorageWatchList === null ? checkType = 'initial' : checkType = 'compare with localStorage'

    function checkInLocalStorage(item) {
        const filmFromLocalStorage = localStorageWatchListJson.find(film => film.id === item.id)
        return Boolean(filmFromLocalStorage) === true ? filmFromLocalStorage : item;
    }
    switch (checkType) {
        case 'initial':
            return modifiedData
        case 'compare with localStorage':
            dispatch(setWatchList(localStorageWatchListJson))
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
    return dispatch(setWatchList(cleanWatchList))
}

export const getFilmDetailsFromApi = (id) => async (dispatch) => {
    // Spinner
    dispatch(setLoading(true))
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=4d0c68776909a3f926088d7ddf14c097`;
    await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return dispatch(setFilmDetails(data))
        })
    setTimeout(() => dispatch(setLoading(false)), 800)
}

