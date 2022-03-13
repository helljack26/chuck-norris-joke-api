import { useEffect } from 'react';
import FavoriteHeader from '../FavoriteHeader';
import FavoriteBlock from '../FavoriteBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/actions';

const initialSetOnlyInFavoriteItem = () => {
    let initial = false;
    if (window.localStorage.getItem('favoriteList') !== null) {
        const localStorageFavoriteListJson = JSON.parse(window.localStorage.getItem('favoriteList'))
        if (initial === false) {
            initial = true
            return localStorageFavoriteListJson.filter((item) => item.inFavorite === true)
        }
    }
};

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const isFavoriteList = Boolean(favoriteJokeList.length)

    useEffect(() => {
        const cleanLocalStorageFavoriteList = initialSetOnlyInFavoriteItem()
        if (cleanLocalStorageFavoriteList !== undefined) {
            dispatch(setFavoriteJokeList(cleanLocalStorageFavoriteList))
        }
    }, [dispatch])

    return (isFavoriteList === true ?
        <>
            <FavoriteHeader screenType='tablet' />
            <FavoriteBlock screenType='desktop' favoriteJokeList={favoriteJokeList} />
            <FavoriteBlock screenType='tablet' favoriteJokeList={favoriteJokeList} />
        </>
        : null
    )
}

export default Favorite;