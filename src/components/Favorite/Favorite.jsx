import './Favorite.css';
import { useEffect } from 'react';
import FavoriteHeader from '../FavoriteHeader';
import JokeBlockItem from '../JokeBlockItem';
import removeAllNotInFavoriteItem from '../helpers/removeAllNotInFavoriteItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/types';

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);

    useEffect(() => {
        const cleanLocalStorageFavoriteList = removeAllNotInFavoriteItem()
        const cleanFavoriteList = cleanLocalStorageFavoriteList !== undefined ? removeAllNotInFavoriteItem() : [];
        dispatch(setFavoriteJokeList(cleanFavoriteList))
    }, [dispatch])
    
    return (
        <>
            <FavoriteHeader type={'tablet'} />

            <aside className='favoriteBlockDesktop'>
                <FavoriteHeader type={'desktop'} />
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
    )
}

export default Favorite;