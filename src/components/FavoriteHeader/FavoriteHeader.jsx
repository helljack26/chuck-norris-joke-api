import { useSelector } from 'react-redux';
import FavoriteHeaderDesktop from '../FavoriteHeaderDesktop';
import FavoriteHeaderTablet from '../FavoriteHeaderTablet';
const FavoriteHeader = ({ screenType }) => {
    const favoriteJokeList = useSelector(state => state.chuckApi.favoriteJokeList);
    const isExistFavoriteList = Boolean(favoriteJokeList.length) === true;

    return isExistFavoriteList ? screenType === 'desktop' ?
        <FavoriteHeaderDesktop />
        :
        <FavoriteHeaderTablet />
        : null
}

export default FavoriteHeader; 