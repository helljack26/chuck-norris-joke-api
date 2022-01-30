import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import style from './AddToFavoriteButton.module.scss'
import { addToFavoriteList, removeFromFavoriteList } from '../../store/chuckApi/types';

const buttonType = {
    inFavorite: {
        url: './img/icon/heart.svg'
    },
    notInFavorite: {
        url: './img/icon/heart_stroke.svg'
    }
}
const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite = undefined, value, favoriteBlockStyle }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState()
    useEffect(() => {
        return inFavorite !== undefined ? setType(inFavorite) : null
    }, [setType, inFavorite])

    return type === true ?
        <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
            <img src='./img/icon/heart.svg' alt='In favorite button'
                className={style.inFavorite}
                onClick={() => {
                    return (dispatch(removeFromFavoriteList(id)),
                        setType(false))
                }} />
        </button>
        : <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
            <img src='./img/icon/heart_stroke.svg' alt="Add to Favorite list"
                className={style.notInFavorite} onClick={() => {
                    return (dispatch(addToFavoriteList(categories, icon_url, id, updated_at, url, value)),
                        setType(true))
                }} />
        </button>
}
export default AddToFavoriteButton;
