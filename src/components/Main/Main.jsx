import style from './Main.module.scss'
import RadioGroup from '../RadioGroup';
import JokeBlockItem from '../JokeBlockItem';
import { useDispatch, useSelector } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/types';
const Main = () => {
    const dispatch = useDispatch();
    const jokeList = useSelector(state => state.chuckApi.jokeList)
    return (
        <main>
            <div className={style.mainHeader}>
                <img src="./img/icon/chucknorris_logo.png" alt="Logo" className={style.logo} />
                <div>
                    <h1>Hey!</h1>
                    <p className={style.description}>Let's try to find a joke for you:</p>
                </div>
            </div>
            <RadioGroup />
            <button type='button' className={style.radioGroupBtn}
                onClick={() => {
                    dispatch(getJokeListFromApi())
                }}
            >Get a joke</button>
            <div className={style.jokesBlock}>
                {jokeList.map((jokeData, key) => {
                    return (
                        <JokeBlockItem jokeData={jokeData} key={key} />
                    )
                })}
            </div>
        </main>
    )
}

export default Main;