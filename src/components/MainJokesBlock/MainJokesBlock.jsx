import JokeBlockItem from '../JokeBlockItem';
import {  useSelector } from 'react-redux';
const MainJokesBlock = () => {
    const jokeList = useSelector(state => state.chuckApi.jokeList);
    const isJokeList = Boolean(jokeList);
    return (
        <div>
            {isJokeList ? jokeList.map((jokeData, key) => {
                return (
                    <JokeBlockItem jokeData={jokeData} key={key} />
                )
            }) : ''}
        </div>
    )
}

export default MainJokesBlock;