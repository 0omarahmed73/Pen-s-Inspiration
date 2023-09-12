import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./Verses.module.css";
import { Form } from "react-bootstrap";
import { TypesContext } from "../../context/TypesContext";
import { useContext, useEffect, useRef } from "react";
import { FirebaseContext } from "../../context/FirebaseContext";
import Cards from "./../../components/Card/Cards";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verses = () => {
  const {doneDelete , setDoneDelete} = useContext(FirebaseContext);
  const isMount = useRef(false)
  useEffect(() => {
    if(!isMount.current){
      if (doneDelete) {
        toast.success('تمت العملية بنجاح');
        setDoneDelete(false)
      }
      isMount.current = true;
    }
  }
   , [doneDelete])
  const blogObserveRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const { types, filters, setSelectedType, selectedType, handleFilters } =
    useContext(TypesContext);
  const {
    fetchData,
    noMore,
    fetchData2,
    lastDoc,
    error2,
    fetching,
    loading2,
    data2,
  } = useContext(FirebaseContext);
  useEffect(() => {
    if (!filters || !filters.length) {
      handleFilters("title");
      setSelectedType('مدح')
    }
    fetchData(filters ? filters : "title" , selectedType ? selectedType : "مدح"
    );
  }, [filters, selectedType]);
  useEffect(() => {
    if (error2) {
      toast.error("فشل جلب البيانات");
    }
  }, [error2]);
  console.log(selectedType);
  return (
    <div className={style.verses}>
      <Container className="py-4">
        <h1 className="text-center text-white">القصائد</h1>
        {loading2 ? (
          <>
            <div className="text-center m-auto mt-3 loader"></div>
            <p className="text-white mt-3 loadingP text-center">
              جاري التحميل...
            </p>
          </>
        ) : (
          ""
        )}
        <div className="filters d-flex flex-column flex-row w-100 gap-3 justify-content-center">
          <div className={style.cards}>
            {!loading2 && data2 ? (
              <>
                <Row xs="2" md="3" lg="4" className="g-4 w-75">
                  <Col>
                    <Form.Select
                      value={filters}
                      onChange={(e) => {
                        handleFilters(e.target.value);
                      }}
                      aria-label="Default select example"
                    >
                      <option value="">الترتيب حسب</option>
                      <option value="createdAt">التاريخ</option>
                      <option value="title">العنوان</option>
                      <option value="poet">اسم الشاعر</option>
                      <option value="type">النوع</option>
                    </Form.Select>
                  </Col>
                  {types ? (
                    <Col>
                      <Form.Select
                        onChange={(e) => {
                          setSelectedType(e.target.value);
                        }}
                        value={selectedType}
                        aria-label="Default select example"
                      >
                        {/* <option key={crypto.randomUUID()} value="مدح">
                          اختر النوع
                        </option> */}
                        {types.length
                          ? types.map((t) => {
                              return (
                                <option key={crypto.randomUUID()} value={t}>
                                  {t}
                                </option>
                              );
                            })
                          : ""}
                      </Form.Select>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
                <Row xs="1" md="2" lg="4" className="my-2 g-4">
                  {data2.length ? (
                    data2.map((d) => {
                      return (
                        <Col key={crypto.randomUUID()}>
                          <Cards data={d} />
                        </Col>
                      );
                    })
                  ) : !loading2 ? (
                    <p className="w-100 no-poems text-center text-white opacity-75">
                      لا يوجد قصائد ...
                    </p>
                  ) : (
                    ""
                  )}
                </Row>
              </>
            ) : !loading2 ? (
              <Row xs="1" md="2" lg="4" className="my-2 g-4">
                <p className="w-100 no-poems text-center text-white opacity-75">
                  لا يوجد قصائد ...
                </p>
              </Row>
            ) : (
              ""
            )}
          </div>
        </div>
        {fetching ? (
          <>
            <div className="text-center m-auto mt-3 loader"></div>
          </>
        ) : (
          ""
        )}
        <div className="blog-observer" ref={blogObserveRef}>
          {" "}
        </div>
        {data2 && data2.length && !loading2 && !noMore ? (
          <div className="bttt w-100 d-flex justify-content-center my-3">
            <Button
              onClick={() => fetchData2(lastDoc)}
              className="m-auto text-center w-50 w-md-15"
            >
              عرض المزيد
            </Button>
          </div>
        ) : !loading2 && noMore ? (
          <div className="bttt w-100 d-flex justify-content-center flex-column my-3">
            <p className="text-center text-white">
              لا يوجد قصائد اخرى للعرض...
            </p>
            <Button
              disabled={true}
              onClick={() => fetchData2(lastDoc)}
              className="m-auto text-center w-50 w-md-15"
            >
              عرض المزيد
            </Button>
          </div>
        ) : (
          ""
        )}
        <ToastContainer position="bottom-center" theme="dark" />
      </Container>
    </div>
  );
};

export default Verses;
