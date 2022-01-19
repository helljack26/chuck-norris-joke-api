import { useState } from 'react'
import { useDispatch } from 'react-redux';
import style from './AddToFavoriteButton.module.scss'
import './AddToFavoriteButton.module.scss'
import { toFavoriteList } from '../../store/chuckApi/types';


const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite, value, favoriteBlockStyle }) => {
    const dispatch = useDispatch();
    const [type, setType] = useState()

    const buttonType = {
        inFavorite: {
            imgUrlValue: './img/icon/heart.svg',
            altValue: 'In favorite button',
            setTypeValue: false
        },
        notInFavorite: {
            imgUrlValue: './img/icon/heart_stroke.svg',
            altValue: 'Add to Favorite list',
            setTypeValue: true
        }
    }

    const btnType = type === undefined ?
        inFavorite === false ? buttonType.notInFavorite : buttonType.inFavorite :
        type === false ? buttonType.notInFavorite : buttonType.inFavorite;

    const { imgUrlValue, altValue, setTypeValue } = btnType;

    return (
        <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
            <img src={imgUrlValue} alt={altValue}
                className={btnType === buttonType.notInFavorite ? style.notInFavorite : style.inFavorite}
                onClick={() => {
                    return (
                        btnType === buttonType.notInFavorite ? dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value)) :
                            dispatch(toFavoriteList(undefined, undefined, id, undefined, undefined, undefined)),
                        setType(setTypeValue))

                }} />
        </button>
    )
}

export default AddToFavoriteButton;