import style from "./Home.module.css";
import { Button, Col, Container, Row } from "react-bootstrap";
import Cards from "../../components/Card/Cards.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import { toast , ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Tracks = () => {
  const { error2, fetchData, data2 , loading2} = useContext(FirebaseContext);
  useEffect(() => {
    fetchData(); 
  }, []);
  useEffect(() => {
    console.log(error2);
    if (error2){
      toast.error('فشل جلب البيانات')
    }
  } , [error2])
  if (data2.length > 4) {
    data2.length = 4;
  }
  const navigate = useNavigate();
  return (
    <div className={style.home2}>
      <Container className={`text-center py-4`}>
        <h1 className={`${style.pen} text-white mt-2`}>
          {" "}
          احدث القصائد المضافة
        </h1>
        <div className={style.cards}>
          {loading2 ? (
            <>
            <div className="text-center m-auto mt-3 loader"></div>
            <p className="text-white mt-3 loadingP">جاري التحميل...</p>
            </>
          ) : ''}
          {!loading2 && data2 ? (
            data2.length ? (
              <Row xs="1" md="2" lg="4" className="my-2 g-4">
                {data2.map((d) => {
                  return (
                    <Col key={crypto.randomUUID()}>
                      <Cards data={d} />
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p className="w-100 no-poems text-center text-white opacity-75">
                لا يوجد قصائد ...
              </p>
            )
          ) : (
            ""
          )}
          {data2 && data2.length ? (
            <Button
              onClick={() => navigate("/verses")}
              className="mt-4 w-75 w-md-25"
              variant="primary"
            >
              عرض المزيد
            </Button>
          ) : (
            ""
          )}
        </div>
        <ToastContainer position="bottom-center" theme="dark" />
      </Container>
    </div>
  );
};

export default Tracks;
