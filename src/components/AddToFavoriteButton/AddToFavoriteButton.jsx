import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import style from './AddToFavoriteButton.module.scss'
import { toFavoriteList } from '../../store/chuckApi/types';

const buttonType = {
    inFavorite: {
        type: 'inFavorite',
        url: './img/icon/heart.svg',
        class: 'inFavorite'
    },
    notInFavorite: {
        type: 'notInFavorite',
        url: './img/icon/heart_stroke.svg',
        class: 'notInFavorite'
    }
}
const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite = undefined, value, favoriteBlockStyle }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState()
    useEffect(() => {
        if (inFavorite === undefined) {
            return
        } else {
            setType(inFavorite)
        }
    }, [setType, inFavorite])

    type === true ? <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
        <img src={buttonType.inFavorite.url} alt='In favorite button'
            className={style.inFavorite}
            onClick={() => {
                return (dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, true)),
                    setType(false))
            }} />
    </button>
        : <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
            <img src={buttonType.notInFavorite.url} alt="Add to Favorite list"
                className={style.notInFavorite} onClick={() => {
                    return (dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, false)),
                        setType(true))
                }} />
        </button>
}
export default AddToFavoriteButton;
