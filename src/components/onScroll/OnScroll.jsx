import { ArrowUp } from 'phosphor-react'
import style from './OnScroll.module.css'
const OnScroll = ({visible = false , onClick}) => {
  return (
    <>
    {visible ? <div onClick={onClick} className={style.onscroll}>
    <ArrowUp size={32} />
    </div> : ''}
    </>
  )
}

export default OnScroll