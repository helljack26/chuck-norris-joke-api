import './FavoriteHeader.css'
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteListState } from '../../store/chuckApi/types';
const FavoriteHeader = ({ type }) => {
    const dispatch = useDispatch();
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);

    switch (type) {
        case 'desktop':
            return (
                <div className='favoriteHeaderDesktop'>
                    <p className='favoriteHeaderText'>Favorite</p>
                </div>
            )
        default:
            return (
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
            )
    }
}

export default FavoriteHeader; 