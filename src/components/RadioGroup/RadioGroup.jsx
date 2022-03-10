import style from './RadioGroup.module.scss'
import './RadioGroup.module.scss'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategoryJoke, updateSearchByInput, setRadioSearchState } from '../../store/chuckApi/actions';
import RadioGroupCategories from '../RadioGroupCategories';

const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
        event.preventDefault();
    }
}
const RadioGroup = () => {
    const categoriesList = useSelector(state => state.chuckApi.categoriesList)
    const radioSearchState = useSelector(state => state.chuckApi.radioSearchState)
    const dispatch = useDispatch();
    const [openCategories, setOpenCategories] = useState(false);

    return <form className={style.radioGroup}>
        {/* Random */}
        <div className={style.radioGroupItem}>
            <input type="radio" className={style.radioBtn} id="random"
                name="contact" value="random" defaultChecked onClick={() => {
                    return (setOpenCategories(false),
                        dispatch(setRadioSearchState(false)),
                        dispatch(updateCategoryJoke('')),
                        dispatch(updateSearchByInput('')))
                }} />
            <label htmlFor="random">Random</label>
        </div>

        {/* Categories */}
        <div className={style.radioGroupItem}>
            <input type="radio" className={style.radioBtn} id="fromCategories"
                name="contact" value="fromCategories" onClick={() => {
                    return (setOpenCategories(true),
                        dispatch(setRadioSearchState(false)),
                        dispatch(updateSearchByInput('')),
                        dispatch(updateCategoryJoke(categoriesList[0])))
                }} />
            <label htmlFor="fromCategories">From categories</label>
        </div>
        <div className={`${openCategories === false ? style.displayNone : style.displayBlock}`} >
            <RadioGroupCategories />
        </div>

        {/* Search */}
        <div className={style.radioGroupItem}>
            <input type="radio" className={style.radioBtn} id="search"
                name="contact" value="search" onClick={() => {
                    return (
                        setOpenCategories(false),
                        dispatch(setRadioSearchState(true)),
                        dispatch(updateCategoryJoke('')))
                }} />
            <label htmlFor="search">Search</label>
        </div>
        <div className={`${radioSearchState === false ? style.displayNone : style.displayBlock}`}>
            <input type="text"
                required="required"
                className={style.searchInput}
                placeholder='Free text search...'
                onKeyPress={(event) => handleKeyPress(event)}
                onInput={(event) => dispatch(updateSearchByInput(event.target.value))}
            />
        </div>
    </form>
}

export default RadioGroup;