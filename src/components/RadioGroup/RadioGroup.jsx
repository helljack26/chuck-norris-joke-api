import style from './RadioGroup.module.scss'
import './RadioGroup.module.scss'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCategoryJoke, updateSearchJoke } from '../../store/chuckApi/types';
import RadioGroupCategories from '../RadioGroupCategories';

const RadioGroup = () => {
    const dispatch = useDispatch();
    // const searchJoke = useSelector(state => state.chuckApi.searchJoke)
    const [openCategories, setOpenCategories] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            event.preventDefault();
        }
    }
    return (
        <>
            <form className={style.radioGroup}>
                {/* Random */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="random"
                        name="contact" value="random" defaultChecked onClick={() => {
                            return (setOpenCategories(false),
                                setOpenSearch(false),
                                dispatch(updateCategoryJoke('')),
                                dispatch(updateSearchJoke('')))
                        }} />
                    <label htmlFor="random">Random</label>
                </div>

                {/* Categories */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="fromCategories"
                        name="contact" value="fromCategories" onClick={() => {
                            return (setOpenCategories(true), setOpenSearch(false), dispatch(updateSearchJoke('')))
                        }} />
                    <label htmlFor="fromCategories">From categories</label>
                </div>
                <div className={style.categoriesBlock}
                    style={openCategories === false ? { display: 'none' } : { display: 'block' }}>
                    <RadioGroupCategories />
                </div>

                {/* Search */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="search"
                        name="contact" value="search" onClick={() => {
                            return (
                                setOpenCategories(false),
                                setOpenSearch(true),
                                dispatch(updateCategoryJoke('')))
                        }} />
                    <label htmlFor="search">Search</label>
                </div>
                <div className={style.searchBlock}
                    style={openSearch === false ? { display: 'none' } : { display: 'block' }}>
                    <input type="text"
                        className={style.searchInput}
                        placeholder='Free text search...'
                        onKeyPress={(event) => handleKeyPress(event)}
                        onInput={(event) => dispatch(updateSearchJoke(event.target.value))}
                    />
                </div>
            </form>
        </>
    )
}

export default RadioGroup;