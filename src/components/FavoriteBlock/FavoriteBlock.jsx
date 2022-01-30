import './FavoriteBlock.css';
import { useSelector } from 'react-redux';
import FavoriteHeader from '../FavoriteHeader';
import JokeBlockItem from '../JokeBlockItem';
const FavoriteBlock = ({ screenType, favoriteJokeList }) => {
    const favoriteListStateBtn = useSelector(state => state.chuckApi.favoriteListStateBtn);
    const isDesktop = screenType === 'desktop' ? true : false;

    const favoriteTabletClass = favoriteListStateBtn === false ? 'favoriteBlockClosed' : 'favoriteBlockOpened';
    const favoriteContainerClass = isDesktop ? 'favoriteContainerDesktop' : `${'favoriteContainerTablet'} ${favoriteTabletClass}`;
    const favoriteJokeBlockClass = isDesktop ? 'favoriteJokeBlock' : 'favoriteBlockTablet'

    return <aside className={favoriteContainerClass}>
        {isDesktop ? <FavoriteHeader screenType='desktop' /> : null}
        <div className={favoriteJokeBlockClass}>
            {favoriteJokeList.map((jokeData, key) => {
                return (
                    <JokeBlockItem jokeData={jokeData} key={key} favoriteBlockStyle={true} />
                )
            })}
        </div>
    </aside>

}

export default FavoriteBlock;