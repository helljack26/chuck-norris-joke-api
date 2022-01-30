import style from './Main.module.css'
import RadioGroup from '../RadioGroup';
import MainJokesBlock from '../MainJokesBlock';
import { useDispatch } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/types';

const Main = () => {
    const dispatch = useDispatch();
    // const searchJoke = useSelector(state => state.chuckApi.searchJoke);
    // const isSearchMin = Boolean(searchJoke.length < 3)

    return <main>
        <div className={style.mainHeader}>
            <img src="./img/icon/chucknorris_logo.png" alt="Logo" className={style.logo} />
            <div>
                <h1>Hey!</h1>
                <p className={style.description}>Let's try to find a joke for you:</p>
            </div>
        </div>
        <RadioGroup />
        <button type='button' className={style.radioGroupBtn}
            onClick={() => dispatch(getJokeListFromApi())}
        >Get a joke</button>
        <MainJokesBlock />
    </main>

}

export default Main;