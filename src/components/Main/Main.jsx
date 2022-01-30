import style from './Main.module.css'
import RadioGroup from '../RadioGroup';
import MainHeader from '../MainHeader';
import MainJokesBlock from '../MainJokesBlock';
import { useDispatch } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/types';

const Main = () => {
    const dispatch = useDispatch();
    // const searchJoke = useSelector(state => state.chuckApi.searchJoke);
    // const isSearchMin = Boolean(searchJoke.length < 3)

    return <main>
        <MainHeader />
        <RadioGroup />
        <button type='button' className={style.mainButton}
            onClick={() => dispatch(getJokeListFromApi())}
        >Get a joke</button>
        <MainJokesBlock />
    </main>

}

export default Main;