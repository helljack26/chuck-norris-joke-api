const isFavorite = item => !!item.inFavorite

const removeAllNotInFavoriteItem = () => {
    let initial = false;
    const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
    const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)

    if (localStorageFavoriteListJson !== null && !initial ) {
            initial = true;
        const cleanLocalStorageFavoriteList = localStorageFavoriteListJson.filter(isFavorite); 
            return cleanLocalStorageFavoriteList
    }
    
};

export default removeAllNotInFavoriteItem
