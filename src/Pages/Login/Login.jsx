import {
  Button,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import style from "./Login.module.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signInHandler, signedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem("login", "loggedIn");
    } else {
      localStorage.setItem("login", "loggedOut");
    }
    if (localStorage.getItem("login") === "loggedIn") {
      navigate("/" , {replace : true});
    }
  }, [navigate, signedIn]);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email.trim() && password.trim()) {
      signInHandler({ email, password })
    }
    else {
      e.target.reset();
      toast.error("الرجاء التاكد من ملأ جميع الفراغات المطلوبة")
    }
  };
  return (
    <div className={style.login}>
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <div className={style.form}>
          <h1 className="text-white mb-3 text-center">تسجيل الدخول</h1>
          <Row>
            <Col>
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>البريد الالكتروني</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="ادخل البريد الإلكتروني"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>كلمة المرور</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="ادخل كلمة المرور"
                  />
                </Form.Group>
                <div className="btnn w-100 text-center">
                  <Button
                    className="mt-2 w-50 mx-auto"
                    variant="outline-light"
                    type="submit"
                  >
                    تسجيل الدخول
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
        <ToastContainer
          autoClose={2000}
          position="bottom-center"
          theme="dark"
        />
      </Container>
    </div>
  );
};

export default Login;
