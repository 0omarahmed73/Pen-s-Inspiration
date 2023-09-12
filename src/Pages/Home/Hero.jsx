import style from './Home.module.css'
import logo from '../../assets/istockphoto-956998294-612x612-removebg-preview.png'
import { Container } from 'react-bootstrap'

const Hero = () => {
  return (
    <div className={style.home}>
    <Container className='text-center py-4'>
    <div className={style.logo}>
      <img src={logo} alt="" />
    </div>
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
    <h1 className={`${style.pen} text-white mt-2`}> وحي القلم</h1>
    {/* <h1 className={`${style.pen} text-white mt-2`}>Pen's Inpiration...</h1> */}
    </div>
    <p className={style.pen2}>حيث يمكن للكلمات ان تصبح احد من السيف</p>
    </Container>
  </div>

  )
}

export default Hero