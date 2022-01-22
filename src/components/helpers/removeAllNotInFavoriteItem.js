const removeAllNotInFavoriteItem = (arr, initial) => {
    if (!initial && arr !== null) {
        initial = true;
        const cleanLocalStorageFavoriteList = arr.filter((item) => {
            return item.inFavorite === true;
        });
        return cleanLocalStorageFavoriteList

    };
};

export default removeAllNotInFavoriteItem