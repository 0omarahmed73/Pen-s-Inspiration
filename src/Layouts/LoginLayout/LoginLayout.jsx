import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar'
import style from '../DefaultLayout/DefaultLayout.module.css'

const LoginLayout = () => {
  return (
    <div className={style.defaultLayout}>
      <NavBar login={localStorage.getItem('login') === 'loggedIn' ? false : true} onlyLogo={true}/>
      <Outlet/>
    </div>
  )
}

export default LoginLayout