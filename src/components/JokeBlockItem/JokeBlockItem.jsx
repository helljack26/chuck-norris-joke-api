import style from './JokeBlockItem.module.scss'
import AddToFavoriteButton from '../AddToFavoriteButton';

const JokeBlockItem = ({ jokeData }) => {
    const { categories, icon_url, id, updated_at, url, value, inFavorite } = jokeData;
    const countLastUpdate = (date) => {
        const lastUpdate = new Date(`${date.slice(0, 10).replace('-', '/').replace('-', '/')}`);
        const now = new Date();
        const difference = lastUpdate.getTime() - now.getTime();
        const days = Math.abs(difference / (1000 * 3600 * 24));
        return Math.ceil(days);
    }
    return (
        <>
            <div className={style.jokeBlockItem}>
                <div className={style.icon}>
                    <img src={icon_url} alt="Joke icon" />
                </div>
                <AddToFavoriteButton categories={categories} icon_url={icon_url} id={id} updated_at={updated_at} url={url} value={value} inFavorite={inFavorite} />
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
                        {categories.length !== 0 ? <p className={style.categories}>{categories}</p> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default JokeBlockItem;

