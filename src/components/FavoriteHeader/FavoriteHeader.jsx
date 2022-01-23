import style from '../Favorite/Favorite.module.css'
import useWindowDimensions from '../helpers/useWindowDimensions';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteListState } from '../../store/chuckApi/types';
const FavoriteHeader = () => {
    const dispatch = useDispatch();
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn[0]);
    const favoriteListStateBlock = useSelector(state => state.chuckApi.favoriteListStateBtn[1]);
    console.log(favoriteListStateBtn);
    const { width } = useWindowDimensions();
    const initialCheckMediaType = () => {
        let initial = false;
        if (width <= 836 && initial === false) {
            initial = true;
            return dispatch(setFavoriteListState(['tablet', false]))
        }
    }
    initialCheckMediaType()
    useEffect(() => {
        if (width === 835 && width < 836) {
            dispatch(setFavoriteListState(['tablet', false]))
        }
        if (width === 837 && width > 836) {
            dispatch(setFavoriteListState(['desktop', true]))
        }
    }, [width, dispatch]);
    return (
        <div className={favoriteListStateBtn === 'desktop' ? style.favoriteHeaderDesktop : style.favoriteHeaderTablet}>
            <button className={style.favoriteBtn}
                onClick={() => {
                    return favoriteListStateBlock === true ?
                        dispatch(setFavoriteListState(['tablet', false])) :
                        dispatch(setFavoriteListState(['tablet', true])
                        )
                }}>
                <img src={favoriteListStateBtn === 'tablet' ? './img/icon/burgerMenu.svg' : ''} alt="" />
            </button>
            <p className={style.favoriteHeaderText}>Favorite</p>
        </div>
    )
}

export default FavoriteHeader; 