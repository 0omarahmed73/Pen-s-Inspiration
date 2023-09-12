import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import Verses from "./Pages/Verses/Verses";
import SingleVerse from "./Pages/Verses/SingleVerse/SingleVerse";
import AddVerse from "./Pages/Verses/AddVerse/AddVerse";
import AboutUs from "./Pages/AboutUs/AboutUs";
import LoginLayout from "./Layouts/LoginLayout/LoginLayout";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="about-me" element={<AboutUs />} />
        </Route>
        <Route path="verses" element={<DefaultLayout />}>
          <Route index element={<Verses />} />
          <Route path=":slug" element={<SingleVerse />} />
          <Route path="add-new-verse" element={<AddVerse />} />
        </Route>
        <Route path="/login" element={<LoginLayout/>}>
          <Route index element={<Login/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
