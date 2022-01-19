import style from './Favorite.module.scss';
import { useEffect } from 'react';
import JokeBlockItem from '../JokeBlockItem';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteJokeList } from '../../store/chuckApi/types';

const Favorite = () => {
    const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    // const reverse = favoriteJokeList.Reverse() 
    console.log(favoriteJokeList);
    useEffect(() => {
        const localStorageFavoriteList = window.localStorage.getItem('favoriteList')
        const localStorageFavoriteListJson = JSON.parse(localStorageFavoriteList)
        console.log(localStorageFavoriteListJson);
        if (localStorageFavoriteListJson !== null) {
            dispatch(setFavoriteJokeList(localStorageFavoriteListJson))
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