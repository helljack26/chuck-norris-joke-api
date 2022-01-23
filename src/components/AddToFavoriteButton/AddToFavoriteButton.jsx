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
    if (type === true) {
        return <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
            <img src={buttonType.inFavorite.url} alt='In favorite button'
                className={style.inFavorite}
                onClick={() => {
                    return (dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, true)),
                        setType(false))
                }} />
        </button>
    }
    else {
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

// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux';
// import style from './AddToFavoriteButton.module.scss'
// import './AddToFavoriteButton.module.scss'
// import { toFavoriteList } from '../../store/chuckApi/types';


// const AddToFavoriteButton = ({ categories, icon_url, id, updated_at, url, inFavorite, value, favoriteBlockStyle }) => {
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
//     const dispatch = useDispatch();
//     const [type, setType] = useState(buttonType.notInFavorite)

//     const { imgUrlValue, altValue, setTypeValue } = type;
//     console.log(type);

//     // const btnType = inFavorite === undefined ? buttonType.notInFavorite : buttonType.inFavorite;


//     // console.log(btnType);
//     useEffect(() => {
//         if (inFavorite === undefined) {
//             if (type === true) {
//                 setType(buttonType.inFavorite)
//             } else {
//                 setType(buttonType.notInFavorite)
//             }
//         } else {
//             setType(inFavorite === true ? setType(buttonType.inFavorite) : setType(buttonType.notInFavorite))
//         }
//     }, [setType, inFavorite, buttonType.inFavorite, buttonType.notInFavorite, type])


//     return (
//         <button type='button' className={!favoriteBlockStyle ? style.addIconBtn : style.addIconFavoriteBtn}>
//             <img src={imgUrlValue} alt={altValue}
//                 className={type === buttonType.notInFavorite ? style.notInFavorite : style.inFavorite}
//                 onClick={() => {
//                     return (
//                         dispatch(toFavoriteList(categories, icon_url, id, updated_at, url, value, type === buttonType.notInFavorite ? true : false)),
//                         setType(setTypeValue))
//                 }} />
//         </button>
//     )
// }

// export default AddToFavoriteButton;