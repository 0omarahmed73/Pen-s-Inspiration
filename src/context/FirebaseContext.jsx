import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { TypesContext } from "./TypesContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const FirebaseContext = createContext();
export const FirebaseProvider = ({ children }) => {
  const [noMore, setNoMore] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { filters, selectedType } = useContext(TypesContext);
  const [nverse, setVerse] = useState("");
  const [done, setDone] = useState(false);
  const [data2, setData2] = useState([]);
  const [doneDelete, setDoneDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const firebaseConfig = {
    apiKey: "AIzaSyBCNNhbNzFpBtQXNmlwPcgQBtVIdHIzo_8",
    authDomain: "fir-cc-e25dc.firebaseapp.com",
    projectId: "fir-cc-e25dc",
    storageBucket: "fir-cc-e25dc.appspot.com",
    messagingSenderId: "956990384032",
    appId: "1:956990384032:web:ab9c01a6d66beeffada6c5",
  };
  // Initialize Firebase
  const navigate = useNavigate();
  initializeApp(firebaseConfig);
  const db = getFirestore();
  const colRef = collection(db, "verses");
  const addDocs = async (data) => {
    setDone(false);
    setLoading(true);
    try {
      const addData = await addDoc(colRef, data);
      navigate("/verses/" + data.slug);
      setDone(true);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const fetchData = async (filter = "title", type = "مدح") => {
    setNoMore(false);
    setLoading2(true);
    let poems = [];
    let q;
    console.log(filter);
    if (filter !== "type") {
      q = query(colRef, orderBy(filter, "desc"), limit(8));
    } else {
      q = query(colRef, where("options", "==", type), limit(8));
    }
    try {
      const data = await getDocs(q);
      const dataGet = data.docs.map((d2) => {
        poems.push({
          ...d2.data(),
          id: d2.id,
          createdAt: `${new Date(d2.data().createdAt.toDate()).getDate()}-${
            new Date(d2.data().createdAt.toDate()).getMonth() + 1
          }-${new Date(d2.data().createdAt.toDate()).getFullYear()}`,
        });
      });
      setLastDoc(data.docs[data.docs.length - 1]);
      setData2(poems);
      console.log(data2);
    } catch (err) {
      setError2(true);
      console.log(err.message);
    }
    setLoading2(false);
  };
  const fetchData2 = async (lastVisible) => {
    setFetching(true);
    let poems = [];
    try {
      let q;
      if (filters !== "type") {
        q = query(
          colRef,
          orderBy(filters, "desc"),
          limit(8),
          startAfter(lastVisible)
        );
      } else {
        q = query(
          colRef,
          where("options", "==", selectedType),
          limit(8),
          startAfter(lastVisible)
        );
      }
      const data = await getDocs(q);
      if (data.size !== 0) {
        const dataGet = data.docs.map((d2) => {
          poems.push({
            ...d2.data(),
            id: d2.id,
            createdAt: `${new Date(d2.data().createdAt.toDate()).getDate()}-${
              new Date(d2.data().createdAt.toDate()).getMonth() + 1
            }-${new Date(d2.data().createdAt.toDate()).getFullYear()}`,
          });
        });
        setData2((data) => [...data, ...poems]);
        setLastDoc(data.docs[data.docs.length - 1]);
        console.log(data2);
      } else {
        setNoMore(true);
      }
    } catch (err) {
      setError2(true);
      console.log(err.message);
    }
    setFetching(false);
  };
  const getSingleVerse = async (id) => {
    setLoading3(true);
    try {
      const q = query(colRef, where("slug", "==", id));
      const verse = await getDocs(q);
      let verseGet = verse.docs.map((d2) => {
        return {
          ...d2.data(),
          id: d2.id,
          createdAt: `${new Date(d2.data().createdAt.toDate()).getDate()}-${
            new Date(d2.data().createdAt.toDate()).getMonth() + 1
          }-${new Date(d2.data().createdAt.toDate()).getFullYear()}`,
        };
      });
      verseGet = verseGet[0];
      setVerse(verseGet);
    } catch (err) {
      setError3(true);
      console.log(err.message);
    }
    setLoading3(false);
  };
  const handleDeleteDoc = async (id) => {
    const docRef = doc(db, "verses", id);
    try {
      const deleteIt = await deleteDoc(docRef);
      navigate("/verses");
      setDoneDelete(true)
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <FirebaseContext.Provider
      value={{
        setLastDoc,
        addDocs,
        setDone,
        noMore,
        fetching,
        lastDoc,
        fetchData2,
        error2,
        error3,
        loading2,
        loading3,
        nverse,
        getSingleVerse,
        loading,
        done,
        data2,
        fetchData,
        handleDeleteDoc,
        doneDelete,
        setDoneDelete,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
