import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import logo from '../../assets/istockphoto-956998294-612x612-removebg-preview.png'
import { NavLink, Outlet } from 'react-router-dom'
import style from './DefaultLayout.module.css'
import OnScroll from '../../components/onScroll/OnScroll'
import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'

const DefaultLayout = () => {
  const [visible , setVisible] = useState(false)
  const [scrollTop, setScrollTop] = useState(0);
  const [scroll , setScroll] = useState(scrollTop)
  useEffect(() => {
    const handleScroll = event => {
      setScrollTop(window.scrollY);
      setScroll(window.scrollY)
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (scrollTop > 70) {
      setVisible(true);
    }
    else setVisible(false)
  } , [scrollTop])
  const handleSetScroll = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})  
  }
  return (
    <div className={style.defaultLayout}>
      <NavBar login={localStorage.getItem('login') === 'loggedIn' ? false : true}/>
    <OnScroll visible={visible} onClick={handleSetScroll}/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default DefaultLayout