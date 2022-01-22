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
    switch (type) {
        case true:

            return <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
                <img src={buttonType.inFavorite.url} alt='In favorite button'
                    className={style.inFavorite}
                    onClick={() => {
                        return (dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, true)),
                            setType(false))
                    }} />
            </button>

        default:
            return <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
                <img src={buttonType.notInFavorite.url} alt="Add to Favorite list"
                    className={style.notInFavorite} onClick={() => {
                        return (dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, false)),
                            setType(true))
                    }} />
            </button>
    }
}

export default AddToFavoriteButton;

// Try your advice to made better code reading, but his code have bag that I havent fixed

// import { useState } from 'react'
// import { useDispatch } from 'react-redux';
// import style from './AddToFavoriteButton.module.scss'
// import './AddToFavoriteButton.module.scss'
// import { toFavoriteList } from '../../store/chuckApi/types';


// const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite, value, favoriteBlockStyle }) => {
//     const dispatch = useDispatch();
//     const [type, setType] = useState()

//     const buttonType = {
//         inFavorite: {
//             imgUrlValue: './img/icon/heart.svg',
//             altValue: 'In favorite button',
//             setTypeValue: false
//         },
//         notInFavorite: {
//             imgUrlValue: './img/icon/heart_stroke.svg',
//             altValue: 'Add to Favorite list',
//             setTypeValue: true
//         }
//     }

//     const btnType = type === undefined ?
//         inFavorite === false ? buttonType.notInFavorite : buttonType.inFavorite :
//         type === false ? buttonType.notInFavorite : buttonType.inFavorite;

//     const { imgUrlValue, altValue, setTypeValue } = btnType;
//     console.log(btnType);

//     return (
//         <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
//             <img src={imgUrlValue} alt={altValue}
//                 className={btnType === buttonType.notInFavorite ? style.notInFavorite : style.inFavorite}
//                 onClick={() => {
//                     return (
//                         btnType === buttonType.notInFavorite ? dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value)) :
//                             dispatch(toFavoriteList(undefined, undefined, id, undefined, undefined, undefined)),
//                         setType(setTypeValue))

//                 }} />
//         </button>
//     )
// }

// export default AddToFavoriteButton;