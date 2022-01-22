import style from './JokeBlockItem.module.scss'
import AddToFavoriteButton from '../AddToFavoriteButton';
import countLastUpdate from '../helpers/countLastUpdate';

const JokeBlockItem = ({ jokeData, favoriteBlockStyle }) => {
    const { categories, icon_url, id, updated_at, url, value, inFavorite } = jokeData;

    return (
        <div className={favoriteBlockStyle === undefined ? style.jokeBlockItem : style.jokeBlockFavoriteItem}>
            <div className={style.icon}>
                <img src={icon_url} alt="Joke icon" />
            </div>
            <AddToFavoriteButton categories={categories} icon_url={icon_url} id={id}
                updated_at={updated_at} url={url} value={value} inFavorite={inFavorite}
                favoriteBlockStyle={favoriteBlockStyle}
            />
            <div className={style.data}>
                <div className={style.idBlock}>
                    <p className={style.id}>ID:</p>
                    <a href={url} className={style.linkText}>{id}
                        <img src="./img/icon/external-link.svg" className={style.linkIcon} alt="Icon external link" />
                    </a>
                </div>
                <p className={style.text}>{value}</p>
                <div className={style.jokeFooter}>
                    {updated_at !== undefined ? <p className={style.lastUpdate}>Last update: {countLastUpdate(updated_at)} days ago.</p> : null}
                    {categories ? categories.length !== 0 && categories.length !== undefined ? <p className={style.categories}>{categories}</p> : null : null}
                </div>
            </div>
        </div>
    )
}

export default JokeBlockItem;

