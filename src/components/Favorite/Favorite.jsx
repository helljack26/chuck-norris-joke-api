import style from './Favorite.module.scss';
import { useEffect } from 'react';
import JokeBlockItem from '../JokeBlockItem';
import removeAllNotInFavoriteItem from '../helpers/removeAllNotInFavoriteItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/types';

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);

    useEffect(() => {
        const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
        const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)
        if (localStorageFavoriteListJson !== null) {
            let initial = false;
            const cleanLocalStorageFavoriteList = initial === false ? removeAllNotInFavoriteItem(localStorageFavoriteListJson, initial) : localStorageFavoriteListJson;
            dispatch(setFavoriteJokeList(cleanLocalStorageFavoriteList))
        }
    }, [dispatch])

    return (
        <aside className={style.favoriteBlock}>
            <div className={style.asideHeader}>
                <button className={style.favoriteBtn}>
                    menu
                    </button>
                <p className={style.favoriteHeader}>Favorite</p>
            </div>
            <div className={style.favoriteJokeBlock}>
                {favoriteJokeList ? favoriteJokeList.map((jokeData, key) => {
                    return (
                        <JokeBlockItem jokeData={jokeData} key={key} favoriteBlockStyle={true} />
                    )
                }) : ''}
            </div>
        </aside>
    )
}

export default Favorite;