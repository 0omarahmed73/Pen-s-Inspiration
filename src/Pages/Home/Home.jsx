import { useContext, useEffect, useRef } from "react";
import Hero from "./Hero"
import Tracks from "./Tracks"
import { ToastContainer, toast} from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
const Home = () => {
  const {doneSigned , setDoneSigned} = useContext(AuthContext);
  const isMount = useRef(false)
  useEffect(() => {
    if(!isMount.current){
      if (doneSigned) {
        toast.success('تم تسجيل الدخول بنجاح');
        setDoneSigned(false)
      }
      isMount.current = true;
    }
  }
   , [doneSigned])
  return (
    <>
    <Hero/>
    <Tracks/>
    </>
    )
}

export default Home