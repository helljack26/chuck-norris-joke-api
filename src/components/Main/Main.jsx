import style from './Main.module.scss'
import RadioGroup from '../RadioGroup'

const Main = () => {
    return (
        <>
            <main>
                <img src="./img/icon/chucknorris_logo.png" alt="Logo" className={style.logo} />
                <h1>Hey!</h1>
                <p className={style.description}>Let's try to find a joke for you:</p>
                <RadioGroup />
                <button type='button' className={style.radioGroupBtn}>Get a joke</button>
            </main>
        </>
    )
}

export default Main;