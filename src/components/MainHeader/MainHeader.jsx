import style from './MainHeader.module.css'
import logo from '../img/icon/chucknorris_logo.png'

const MainHeader = () => {
    return (
        <div className={style.mainHeader}>
            <img src={logo} alt="Logo" className={style.logo} />
            <div>
                <h1>Hey!</h1>
                <p className={style.description}>Let's try to find a joke for you:</p>
            </div>
        </div>
    )
}

export default MainHeader;