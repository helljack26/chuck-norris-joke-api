import './FavoriteHeader.css'
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteListState } from '../../store/chuckApi/types';
const FavoriteHeader = ({ type }) => {
    const dispatch = useDispatch();
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const isFavoriteList = Boolean(favoriteJokeList.length)

    return isFavoriteList === true ? type === 'desktop' ?
        < div className='favoriteHeaderDesktop' >
            <p className='favoriteHeaderText'>Favorite</p>
        </ div>
        :
        <div className={`${'favoriteHeaderTablet'} ${favoriteListStateBtn === true ? 'favoriteHeaderTabletActive' : ''}`} >
            <button className='favoriteBtn'
                onClick={() => {
                    return favoriteListStateBtn === false ?
                        dispatch(setFavoriteListState(true)) :
                        dispatch(setFavoriteListState(false))
                }}>
                <img src={favoriteListStateBtn === false ?
                    './img/icon/burgerMenu.svg' :
                    './img/icon/burgerMenuClose.svg'} alt="Burger menu button" />
            </button>
            <p className='favoriteHeaderText'>Favorite</p>
        </div>
        : null

}

export default FavoriteHeader; 