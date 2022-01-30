import style from './MainButton.module.css'
import { useDispatch } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/types';

const MainButton = () => {
    const dispatch = useDispatch();
    
    // const searchJoke = useSelector(state => state.chuckApi.searchJoke);
    // const isSearchMin = Boolean(searchJoke.length < 3)
    return <button type='button' className={style.mainButton}
            onClick={() => dispatch(getJokeListFromApi())}
        >Get a joke</button>
    
}

export default MainButton;