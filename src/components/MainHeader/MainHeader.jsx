import style from './MainHeader.module.css'

const MainHeader = () => {
    return (
        <div className={style.mainHeader}>
            <img src="./img/icon/chucknorris_logo.png" alt="Logo" className={style.logo} />
            <div>
                <h1>Hey!</h1>
                <p className={style.description}>Let's try to find a joke for you:</p>
            </div>
        </div>
    )
}

export default MainHeader;