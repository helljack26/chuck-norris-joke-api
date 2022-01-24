const removeAllNotInFavoriteItem = () => {
    let initial = false;
    const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
    const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)

    if (localStorageFavoriteListJson !== null && !initial ) {
            initial = true;
            const cleanLocalStorageFavoriteList = localStorageFavoriteListJson.filter((item) => {
                return item.inFavorite === true;
            });
            return cleanLocalStorageFavoriteList
    }else{
        return undefined
    }
};

export default removeAllNotInFavoriteItem