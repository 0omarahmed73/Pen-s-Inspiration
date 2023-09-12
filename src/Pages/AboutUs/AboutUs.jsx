import { Container } from 'react-bootstrap'
import myImg from '../../assets/photo_2022-06-27_05-44-48.jpg'
import style from './AboutUs.module.css'
const AboutUs = () => {
  return (
    <div className={style.about_us}>
      <Container className='text-center text-white'>
        <h1>من نحن ؟</h1>
        <div className={style.img}>
          <img src={myImg} alt="" />
        </div>
        <p>م/ عمر أحمد سعيد - طالب في كلية الهندسة شبرا </p>
        <p>مهتم بدراسة الأدب  العربي واسعى لنشر ثقافتنا العربية بين الناس</p>
        <p>الهدف الرئيسي من انشاء هذا المشروع كان لنشر القصائد التي اكتبها ولكن الله الهمني هذه الفكرة</p>
        <p>وهي انشاء مدونة لنشر قصائد الشعر العربي</p>
      </Container>
    </div>
  )
}

export default AboutUs