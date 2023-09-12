import { createContext, useContext, useState } from "react";
import { FirebaseContext } from "./FirebaseContext";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [onLoggin , setOnLoggin] = useState(false)
  const [error , setError] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [doneSigned , setDoneSigned] = useState(false)
  const { app } = useContext(FirebaseContext);
  const auth = getAuth(app);
  const signInHandler = (data) => {
    setOnLoggin(true);
    setError(false)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log("Login Success");
        const user = userCredential.user;
        toast.success("تم تسجيل الدخول بنجاح");
        setDoneSigned(true);
      })
      .then(() => {
        setSignedIn(true);
      })
      .catch((err) => toast.error('الرجاء التاكد من البريد الالكتروني وكلمة المرور'));
  };
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!signedIn) {
        setSignedIn(true);
      }
      if (localStorage.getItem("login") !== "loggedIn") {
        localStorage.setItem("login", "loggedIn");
      }
      const uid = user.uid;
    } else {
      if (signedIn) {
        setSignedIn(false);
      }
      if (localStorage.getItem("login") !== "loggedOut") {
        localStorage.setItem("login", "loggedOut");
      }
    }
  });
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        setSignedIn(false);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <AuthContext.Provider value={{onLoggin , setOnLoggin , doneSigned , setDoneSigned , error , setError , handleLogOut, signInHandler, signedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
