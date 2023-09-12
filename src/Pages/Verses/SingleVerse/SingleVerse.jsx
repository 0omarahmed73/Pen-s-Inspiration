import style from "./SingleVerse.module.css";
import { Button, Col, Container, Modal, Row, Toast } from "react-bootstrap";
import img from "../../../assets/istockphoto-956998294-612x612-removebg-preview.png";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FirebaseContext } from "../../../context/FirebaseContext";
import { CaretDoubleDown, CaretDoubleUp, Trash } from "phosphor-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../context/AuthContext";

const SingleVerse = () => {
  const [showModel, setShowModel] = useState(false);
  const handleClose = () => setShowModel(false);
  const handleShow = () => setShowModel(true);
  const { signedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const params = useParams();

  const { getSingleVerse, done, setDone, error3, loading3, nverse , handleDeleteDoc } =
    useContext(FirebaseContext);
  const isMount = useRef(false);
  useEffect(() => {
    if (!isMount.current) {
      if (done) {
        toast.success("تمت الاضافة بنجاح");
        setDone(false);
      }
      isMount.current = true;
    }
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    if (params.slug) {
      console.log(params.slug);
      getSingleVerse(params.slug);
    }
  }, [params.slug]);
  console.log(nverse);
  useEffect(() => {
    console.log(error3);
    if (error3) {
      toast.error("فشل جلب البيانات");
    }
  }, [error3]);

  return (
    <div className={style.verseOnly}>
      <Container fluid={true}>
        {loading3 ? (
          <div className="errorFull2">
            <div className="cont">
              <div className="text-center m-auto loader"></div>
              <p className="text-white loadingP">جاري التحميل...</p>
            </div>
          </div>
        ) : (
          ""
        )}
        {nverse && !loading3 ? (
          <Row>
            <Col className={`${style.one} ${!show ? style.hide : ""} pe-4`}>
              <div className="img">
                <img src={nverse.image} alt="poem-img" />
              </div>
              <p>اسم الشاعر : {nverse.poet}</p>
              <p>تاريخ الاضافة : {nverse.createdAt}</p>
              <p>نوع القصيدة : {nverse.options}</p>
              <span
                onClick={() => setShow((s) => !s)}
                className={`${style.show} d-md-none`}
              >
                {show ? (
                  <CaretDoubleDown size={24} />
                ) : (
                  <CaretDoubleUp size={24} />
                )}
              </span>
            </Col>
            <Col
              onClick={() => setShow((d) => false)}
              xs="12"
              className={`"pe-md-5" ${style.allPost}`}
            >
              {localStorage.getItem('login') === 'loggedIn' ? (
                <span onClick={handleShow} className={style.deletePost}>
                  <Trash size={32} />
                </span>
              ) : (
                ""
              )}
              <h1 className="text-center text-white">{nverse.title}</h1>
              <p
                className={`${style.poem} text-center text-white`}
                dangerouslySetInnerHTML={{ __html: nverse.body }}
              ></p>
            </Col>
          </Row>
        ) : !loading3 && !nverse ? (
          navigate("/notfound", { replace: true })
        ) : (
          ""
        )}
        <ToastContainer position="bottom-center" theme="dark" />
        <Modal show={showModel} centered={true} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>هل تود مسح القصيدة</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={() => {
            handleDeleteDoc(nverse.id);
          }}>
            نعم
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            لأ
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </div>
  );
};

export default SingleVerse;
