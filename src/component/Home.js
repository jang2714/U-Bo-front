import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContentsBox from "./ContentsBox";
import styles from "../css/Home.module.css";
import mainImg from "../img/mainImg.png";
import dummy from "../db/data.json";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import React from "react";
import Benner from "../img/Benner.png";
import useFetch from "../hook/useFetch";
export default function Home(){
    // const best_item = [...data].sort((a, b)=>(
    //     a.price - b.price
    // ));
    // const recent_product = [...data].sort((a, b) =>(
    //     a.time - b.time
    // ));
    // const recent_rental = [...data].sort((a, b)=> (
    //     b.time - a.time
    // ));

    // const {data, loading, error} = useFetch(`home/popular`);
    // const {data, loading, error} = useFetch(`home/used`);
    // const {data, loading, error} = useFetch(`home/rental`);
    // const _data = data;

    const index = ["popular", "used", "rental"];

    return (
        <div>

            <Header />
            <div className="content_body">
                <div>
                    {/*<div className={styles.img_txt}>우리 학교 보따리상</div>*/}
                    <Container className={styles.container}>
                    <img src={Benner} className={styles.img} alt={"mainIng"}/>
                    </Container>
                </div>

            <Container className={styles.container} style={{ overflowX: 'auto' }}>
                <div className={styles.container_title}>
                    <h5>
                        실시간 인기 글
                    </h5>
                </div>

                <ContentsBox item={index[0]}/>
                <div className={styles.container_title}>
                    <h5>
                        최근 중고거래
                    </h5>
                    <Button className={styles.btn} variant="pills" href="/product_board">더보기 ></Button>
                </div>
                <ContentsBox item={index[1]}/>
                <div className={styles.container_title}>
                    <h5>
                        최근 대여
                    </h5>
                    <Button className={styles.btn} variant="pills" href="/rental_board">더보기 ></Button>
                </div>
                <ContentsBox item={index[2]}/>
            </Container>
            </div>
        </div>
    );
}