import { Button, Col, Container, Form, Row, Toast } from "react-bootstrap";
import style from "./AddVerse.module.css";
import ReactQuill from "react-quill";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { serverTimestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddVerse = () => {
  const navigate = useNavigate();
  const { signedIn } = useContext(AuthContext);
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem("login", "loggedIn");
    } else {
      localStorage.setItem("login", "loggedOut");
    }
    if (localStorage.getItem("login") === "loggedOut") {
      navigate("/" , {replace : true});
    }
  }, [navigate, signedIn]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setDone(false);
    setError(false);
  }, []);
  const [error, setError] = useState(null);
  const { addDocs, setDone, loading, done } = useContext(FirebaseContext);
  const [body, setBody] = useState("");
  const [options, setOptions] = useState("");
  const handleSubmitPoems = (e) => {
    e.preventDefault();
    setError("");
    const title = e.target.title.value;
    const poet = e.target.poet.value;
    let image = e.target.image.value;
    console.log({
      title,
      poet,
      image,
      options,
      body,
      createdAt: serverTimestamp(),
    });
    if (title.trim() && poet.trim() && options && body) {
      if (!image.trim()) {
        image =
          "/src/assets/istockphoto-956998294-612x612-removebg-preview.png";
      }
      if (body.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setDone(false);
        toast.error("الرجاء التأكد من ملأ جميع الفراغات");
        return;
      }
      addDocs({
        title,
        poet,
        image,
        options,
        body,
        createdAt: serverTimestamp(),
        slug: title.split(" ").join("-") + "-" + new Date().getTime(),
      });
      console.log(done);
      e.target.reset();
      setBody("");
      setOptions("");
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setDone(false);
      toast.error("الرجاء التأكد من ملأ جميع الفراغات");
    }
  };
  return (
    <div className={style.addVerse}>
      <Container className="py-4">
        <h1 className="mb-3 text-center text-white">اضافة قصيدة جديدة</h1>
        <Row>
          <Col className="m-auto" sm="10" md="8" lg="5">
            <Form
              onSubmit={handleSubmitPoems}
              className="d-flex flex-column gap-3"
            >
              {/* {done ? (
                <>
                  <Toast
                    onClose={() => setError(null)}
                    animation={true}
                    className="d-inline-block m-auto w-100"
                    bg="primary"
                  >
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="ms-auto">تمت العملية بنجاح</strong>
                    </Toast.Header>
                    <Toast.Body className="">تمت اضافة قصيدة جديدة بنجاح</Toast.Body>
                  </Toast>
                </>
              ) : (
                ""
              )} */}
              {error ? (
                <>
                  <Toast
                    onClose={() => setError(null)}
                    animation={true}
                    className="d-inline-block m-auto w-100"
                    bg="danger"
                  >
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="ms-auto">حدث خطأ</strong>
                    </Toast.Header>
                    <Toast.Body className="">{error}</Toast.Body>
                  </Toast>
                </>
              ) : (
                ""
              )}
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>اسم القصيدة</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="ادخل عنوان القصيدة"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="poet">
                <Form.Label>اسم الشاعر</Form.Label>
                <Form.Control
                  type="text"
                  name="poet"
                  placeholder="ادخل اسم الشاعر"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>الصورة</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="ادخل صورة للقصيدة"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label>النوع</Form.Label>
                <Form.Select
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  name="type"
                >
                  <option value="">اختر النوع</option>
                  {["مدح", "حزين", "رعب", "فروسية", "هجاء", "رثاء", "مجون"].map(
                    (t) => {
                      return (
                        <option key={crypto.randomUUID()} value={t}>
                          {t}
                        </option>
                      );
                    }
                  )}
                </Form.Select>
              </Form.Group>
              <ReactQuill
                required
                className=""
                theme="snow"
                value={body}
                onChange={setBody}
              />
              <Button
                variant="outline-light"
                type="submit"
                className="d-block w-md-25 m-auto w-100"
                disabled={loading ? true : false}
              >
                {loading ? "جاري الاضافة" : "إضافة"}
              </Button>
              <ToastContainer autoClose={2000} position="bottom-center" theme="dark" />
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddVerse;
