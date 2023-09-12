import { Container, Nav,Navbar } from 'react-bootstrap'
import logo from '../assets/istockphoto-956998294-612x612-removebg-preview.png'
import { Link, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const NavBar = ({onlyLogo = false , login = true}) => {
  const {handleLogOut} = useContext(AuthContext)
  return (
    <Navbar collapseOnSelect={true} fixed='top' expand="lg" className="bg-dark" variant='dark'>
    <Container className='d-flex flex-row'>
      <Navbar.Brand>
        <NavLink to='/'>
        <div className='d-flex h-100 flex-row gap-2 justify-content-center align-items-center'>
          <div className="img">
            <img src={logo} alt="logo" />
          </div>
          <h4 className=''>وحي القلم</h4>
        </div>
        </NavLink>
      </Navbar.Brand>
      {!onlyLogo ? <>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link  as={Link}  to='/'  eventKey="0">الرئيسية</Nav.Link>
          <Nav.Link  as={Link} to='/verses'  eventKey="1">القصائد</Nav.Link>
          {!login ? <Nav.Link  as={Link} to='/verses/add-new-verse' eventKey="2">إضافة قصيدة جديدة</Nav.Link> : ''}
          <Nav.Link  as={Link}  to='/about-me' eventKey="3">من نحن ؟</Nav.Link>
          {login ? <Nav.Link  as={Link} to='/login' eventKey="4">دخول</Nav.Link> : <Link onClick={handleLogOut} className='me-2'  as={Link} eventKey="4">تسجيل الخروج</Link>}
        </Nav>
      </Navbar.Collapse>
      </> : ''}
    </Container>
  </Navbar>

  )
}

export default NavBar