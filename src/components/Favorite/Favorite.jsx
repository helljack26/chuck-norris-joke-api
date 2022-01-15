import style from './Favorite.module.scss'

const Favorite = () => {
    return (
        <>
            <aside className={style.favoriteBlock}>
                <p className={style.favoriteHeader}>Favorite</p>
            </aside>
        </>
    )
}

export default Favorite;