import './FavoriteHeaderTablet.css'
import { setFavoriteListState } from '../../store/chuckApi/actions';
import { useDispatch, useSelector } from 'react-redux';
import burgerMenuOpen from '../img/icon/burgerMenu.svg'
import burgerMenuClosed from '../img/icon/burgerMenuClose.svg'
const FavoriteHeaderTablet = () => {
    const dispatch = useDispatch();
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);

    const isOpenFavoriteList = favoriteListStateBtn === true;
    const isClosedFavoriteList = favoriteListStateBtn === false;

    return <div className={`${'favoriteHeaderTablet'} ${isOpenFavoriteList ? 'favoriteHeaderTabletActive' : ''}`} >
        <button className='favoriteBtn'
            onClick={() => {
                return isClosedFavoriteList ?
                    dispatch(setFavoriteListState(true)) :
                    dispatch(setFavoriteListState(false))
            }}>
            <img src={isClosedFavoriteList ?
                { burgerMenuOpen } :
                { burgerMenuClosed }} alt="Burger menu button" />
        </button>
        <p className='favoriteHeaderText'>Favorite</p>
    </div>
}

export default FavoriteHeaderTablet;