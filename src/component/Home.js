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
import React, {useEffect, useState} from "react";
import BennerLarge from "../img/Benner.png";
import BennerSmall from "../img/BennerMobile.png";
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
    const [imgSrc, setImgSrc] = useState(BennerLarge);

    useEffect(() => {
        // 화면 크기가 작으면 작은 이미지로 변경
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setImgSrc(BennerSmall);
            } else {
                setImgSrc(BennerLarge);
            }
        };

        handleResize(); // 처음 로드 시 실행

        window.addEventListener("resize", handleResize);

        // 컴포넌트가 언마운트되면 이벤트 리스너 제거
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    return (
        <div>

            <Header />
            <div className="content_body">
                <div>
                    <Container className={styles.customContainer}>
                    <img src={imgSrc} className={styles.img} alt={"mainIng"}/>
                    </Container>
                </div>

            <Container className={styles.customContainer} style={{ overflowX: 'auto' }}>
                <div className={styles.container_title}>
                    <div className={styles.home_text}>
                        실시간 인기 글
                    </div>
                </div>

                <ContentsBox item={index[0]}/>
                <div className={styles.container_title}>
                    <div className={styles.home_text}>
                        최근 중고거래
                    </div>
                    <Button className={styles.btn} variant="pills" href="/product_board">더보기 ></Button>
                </div>
                <ContentsBox item={index[1]}/>
                <div className={styles.container_title}>
                    <div className={styles.home_text}>
                        최근 대여
                    </div>
                    <Button className={styles.btn} variant="pills" href="/rental_board">더보기 ></Button>
                </div>
                <ContentsBox item={index[2]}/>
            </Container>
            </div>
        </div>
    );
}