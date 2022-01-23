import style from './Favorite.module.css';
import { useEffect } from 'react';
import FavoriteHeader from '../FavoriteHeader';
import JokeBlockItem from '../JokeBlockItem';
import removeAllNotInFavoriteItem from '../helpers/removeAllNotInFavoriteItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/types';

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const favoriteListStateMedia = useSelector(state => state.chuckApi.favoriteListStateBtn[0]);
    const favoriteListStateBlock = useSelector(state => state.chuckApi.favoriteListStateBtn[1]);

    useEffect(() => {
        const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
        const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)
        if (localStorageFavoriteListJson !== null) {
            let initial = false;
            const cleanLocalStorageFavoriteList = initial === false ?
                removeAllNotInFavoriteItem(localStorageFavoriteListJson, initial) :
                localStorageFavoriteListJson;
            dispatch(setFavoriteJokeList(cleanLocalStorageFavoriteList))
        }
    }, [dispatch])
    return (
        <>
            {favoriteListStateMedia === 'tablet' ? <FavoriteHeader /> : ''}
            <aside className={`${favoriteListStateMedia === 'desktop' ? style.favoriteBlockDesktop : style.favoriteBlockTablet} 
            ${favoriteListStateBlock === false ? style.favoriteBlockClosed : style.favoriteBlockOpened}`}
            >
                {favoriteListStateMedia === 'desktop' ? <FavoriteHeader /> : ''}
                <div className={style.favoriteJokeBlock}>
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