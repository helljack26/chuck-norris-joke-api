import style from './Main.module.scss'
import RadioGroup from '../RadioGroup';
import { useDispatch } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/types';
const Main = () => {
    const dispatch = useDispatch();
    return (
        <>
            <main>
                <img src="./img/icon/chucknorris_logo.png" alt="Logo" className={style.logo} />
                <h1>Hey!</h1>
                <p className={style.description}>Let's try to find a joke for you:</p>
                <RadioGroup />
                <button type='button' className={style.radioGroupBtn}
                    onClick={() => dispatch(getJokeListFromApi())}
                >Get a joke</button>
                <div className={style.jokesBlock}>

                </div>
            </main>
        </>
    )
}

export default Main;