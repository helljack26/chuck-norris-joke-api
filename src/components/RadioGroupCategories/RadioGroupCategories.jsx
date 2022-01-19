import style from './RadioGroupCategories.module.scss'
import { getCategoriesFromApi, updateCategoryJoke } from '../../store/chuckApi/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RadioGroupCategories = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoriesFromApi())
    }, [dispatch])

    const categoriesList = useSelector(state => state.chuckApi.categoriesList)
    const searchCategory = useSelector(state => state.chuckApi.searchCategory)
    return (
        <div className={style.categoriesBlock}>
            {categoriesList.map((category, key) => {
                return (
                    <button type='button'
                        key={key}
                        className={`${style.categoriesBtn} ${searchCategory === category ? style.active : null}`}
                        onClick={() => dispatch(updateCategoryJoke(category))}
                    >{category}</button>
                );
            })}
        </div>
    )
}

export default RadioGroupCategories;