import style from './RadioGroup.module.scss'
import './RadioGroup.module.scss'
import { useState } from 'react';
const RadioGroup = () => {
    const [openCategories, setOpenCategories] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    return (
        <>
            <form className={style.radioGroup}>
                {/* Random */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="random"
                        name="contact" value="random" defaultChecked onClick={() => {
                            return (setOpenCategories(false), setOpenSearch(false))
                        }} />
                    <label htmlFor="random">Random</label>
                </div>
                {/* Categories */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="fromCategories"
                        name="contact" value="fromCategories" onClick={() => {
                            return (setOpenCategories(true), setOpenSearch(false))
                        }} />
                    <label htmlFor="fromCategories">From categories</label>
                </div>
                <div className={style.categoriesBlock}
                    style={openCategories === false ? { display: 'none' } : { display: 'block' }}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, non!</p>
                </div>
                {/* Search */}
                <div className={style.radioGroupItem}>
                    <input type="radio" className={style.radioBtn} id="search"
                        name="contact" value="search" onClick={() => {
                            return (setOpenCategories(false), setOpenSearch(true))
                        }} />
                    <label htmlFor="search">Search</label>
                </div>
                <div className={style.searchBlock}
                    style={openSearch === false ? { display: 'none' } : { display: 'block' }}>
                    <input type="text" className={style.searchInput} autoFocus />
                </div>
            </form>
        </>
    )
}

export default RadioGroup;