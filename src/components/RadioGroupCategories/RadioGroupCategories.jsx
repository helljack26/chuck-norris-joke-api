import style from './RadioGroupCategories.module.scss'

const RadioGroupCategories = () => {
    const CategoriesBtn = ({ categories }) => {
        return (
            <button type='button' className={style.categoriesBtn}
            >{categories}</button>
        )
    }
    return (
        <>
            <div className={style.categoriesBlock}>
                <CategoriesBtn categories='Animal' />
                <CategoriesBtn categories='Career' />
            </div>
        </>
    )
}

export default RadioGroupCategories;