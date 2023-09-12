import { Button } from 'react-bootstrap'
import style from './NotFound.module.css'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className={style.noFound}>
      <h1 className='text-white'>عفواً - هذه الصفحة غير متوفرة</h1>
      <Button onClick={() => navigate('/' , {replace : true})} variant='outline-danger' size='lg'>العودة للصفحة الرئيسية</Button>
    </div>
  )
}

export default NotFound