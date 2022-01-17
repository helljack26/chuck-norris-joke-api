
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import style from './AddToFavoriteButton.module.scss'
import { toFavoriteList } from '../../store/chuckApi/types';

const buttonTypeArr = {
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
const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite, value }) => {
    console.log(inFavorite);
    const dispatch = useDispatch();
    const [type, setType] = useState();
    switch (type === undefined ? inFavorite : type) {
        case 'inFavorite':
        case true:
            return (
                <>
                    <button type='button' className={style.addIconBtn}>
                        <img src={buttonTypeArr.inFavorite.url} alt='In favorite button'
                            className={style.inFavorite}
                            onClick={() => {
                                dispatch(toFavoriteList(undefined, undefined, id, undefined, undefined, undefined))
                                setType(false)
                            }} />
                    </button>
                </>)
        default:
            return <>
                <button type='button' className={style.addIconBtn}>
                    <img src={buttonTypeArr.notInFavorite.url} alt="add to Favorite list"
                        className={`${style.addIcon} `} onClick={() => {
                            dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value))
                            setType(true)
                        }}
                    />
                </button>
            </>
    }
}

export default AddToFavoriteButton;