
import './../../App.css'

const Header = ({title}) => {

    return (
        <header className="header">
            <div className='header-overlay'></div>
            <div className="container">
                <h1 className="header-text  text-white text-center">{title}</h1>
            </div>
        </header>
    )
}

export default Header