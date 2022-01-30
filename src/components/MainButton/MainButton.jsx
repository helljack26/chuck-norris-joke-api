import style from './MainButton.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getJokeListFromApi } from '../../store/chuckApi/actions';

const MainButton = () => {
    const dispatch = useDispatch();
    const radioSearchState = useSelector(state => state.chuckApi.radioSearchState)
    const searchByInput = useSelector(state => state.chuckApi.searchByInput);

    const isExistSearch = searchByInput ? searchByInput.length : null;
    const isSearchMin = Boolean(isExistSearch < 3);
    const isRadioSearchOpen = Boolean(radioSearchState);
    const isInputCanSendRequest = isSearchMin === false && isRadioSearchOpen === true;
    const isRadioSearchClosed = isRadioSearchOpen === false;

    return <button type='button' className={style.mainButton}
        onClick={() => isInputCanSendRequest ?
            dispatch(getJokeListFromApi())
            :
            isRadioSearchClosed ? dispatch(getJokeListFromApi()) : null
        }
    >Get a joke</button>

}

export default MainButton;