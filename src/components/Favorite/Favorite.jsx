import style from './Favorite.module.scss';
import JokeBlockItem from '../JokeBlockItem';
import { useDispatch, useSelector } from 'react-redux';

const Favorite = () => {
    // const dispatch = useDispatch();
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList)
    return (
        <>
            <aside className={style.favoriteBlock}>
                <div className={style.asideHeader}>
                    <button className={style.favoriteBtn}>
                        menu
                    </button>
                    <p className={style.favoriteHeader}>Favorite</p>
                </div>
                <div className={style.favoriteJokeBlock}>
                    {favoriteJokeList.map((jokeData, key) => {
                        console.log('data', jokeData);
                        return (
                            <JokeBlockItem jokeData={jokeData} key={key} />
                        )
                    })}
                </div>
            </aside>
        </>
    )
}

export default Favorite;