import React from "react";
import { Button, Card } from "react-bootstrap";
import style from "./Card.module.css";
import logo from '../../assets/istockphoto-956998294-612x612-removebg-preview.png'
import { useNavigate } from "react-router-dom";

const Cards = ({data}) => {
  const navigate = useNavigate()
  return (
    <div className={style.card}>
      <Card bg='dark' text="light">
        <div className={style.img}>
          <img src={data.image} alt="" />
        </div>
        <Card.Body>
          <Card.Title as='h3'>{data.title}</Card.Title>
          <Card.Text >
            الشاعر : {data.poet}
            <br/>
            تاريخ الاضافة : {data.createdAt}
            <br/>
            النوع : {data.options}
          </Card.Text>
          <Button onClick={() => navigate(`/verses/${data.slug}`)} variant="outline-danger" className="d-block m-auto w-50 w-md-100">عرض القصيدة</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
