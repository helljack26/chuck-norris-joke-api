import { useEffect } from 'react';
import FavoriteHeader from '../FavoriteHeader';
import FavoriteBlock from '../FavoriteBlock';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/actions';

const initialSetOnlyInFavoriteItem = () => {
    let initial = false;
    const localStorageFavoriteListJson = JSON.parse(window.localStorage.getItem('favoriteList'))

    return localStorageFavoriteListJson !== null && initial === false ? (
        initial = true,
        localStorageFavoriteListJson.filter((item) => item.inFavorite === true))
        : [];
};

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);

    const isFavoriteList = Boolean(favoriteJokeList.length)
    console.log(isFavoriteList);

    useEffect(() => {
        const cleanLocalStorageFavoriteList = initialSetOnlyInFavoriteItem()
        const cleanFavoriteList = cleanLocalStorageFavoriteList !== undefined ? initialSetOnlyInFavoriteItem() : [];
        dispatch(setFavoriteJokeList(cleanFavoriteList))
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