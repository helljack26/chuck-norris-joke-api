import './Favorite.css';
import { useEffect } from 'react';
import FavoriteHeader from '../FavoriteHeader';
import JokeBlockItem from '../JokeBlockItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/types';

const initialSetOnlyInFavoriteItem = () => {
    let initial = false;
    const localStorageFavoriteListJson = JSON.parse(window.localStorage.getItem('favoriteList'))

    return localStorageFavoriteListJson !== null && !initial ? (
        initial = true,
        localStorageFavoriteListJson.filter((item) => item.inFavorite === true))
        : null
};

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);
    const isFavoriteList = Boolean(favoriteJokeList.length)

    useEffect(() => {
        const cleanLocalStorageFavoriteList = initialSetOnlyInFavoriteItem()
        const cleanFavoriteList = cleanLocalStorageFavoriteList !== undefined ? initialSetOnlyInFavoriteItem() : []; dispatch(setFavoriteJokeList(cleanFavoriteList))
    }, [dispatch])

    return (isFavoriteList === true ?
        <>
            <FavoriteHeader screenType='tablet' />

            <aside className='favoriteBlockDesktop'>
                <FavoriteHeader screenType='desktop' />
                <div className='favoriteJokeBlock'>
                    {favoriteJokeList ? favoriteJokeList.map((jokeData, key) => {
                        return (
                            <JokeBlockItem jokeData={jokeData} key={key} favoriteBlockStyle={true} />
                        )
                    }) : ''}
                </div>
            </aside>

            <aside className={`${'favoriteTablet'} ${favoriteListStateBtn === false ? 'favoriteBlockClosed' : 'favoriteBlockOpened'}`} >
                <div className={'favoriteTabletBlock'}>
                    {favoriteJokeList ? favoriteJokeList.map((jokeData, key) => {
                        return (
                            <JokeBlockItem jokeData={jokeData} key={key} favoriteBlockStyle={true} />
                        )
                    }) : ''}
                </div>
            </aside>
        </>
        : null

    )
}

export default Favorite;