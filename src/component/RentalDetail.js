import Carousel from 'react-bootstrap/Carousel';
import image from '../img/examImg.png';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import dummy from '../db/data.json';
import styles from '../css/RentalDetail.module.css';
import imagelogo from "../img/logo.png";
import Header from "./Header";
import useFetch from "../hook/useFetch";
import CustomCalendar from "./CustomCalendar";
import {useState} from "react";
export default function RentalDetail() {
    const {id} = useParams();

    const [productData, setProductData] = useState({
        startDate: '',
        endDate: '',
    });
    const {data, loading, error} = useFetch(`rental/${id}`);
    const _data = data;


    const btn_like = () => {
        alert(`죠습니다!`);
    };

    const handleSelectedDate = (nowStartDate, nowEndDate) => {
        setProductData((prevData) => ({
            ...prevData,
            "startDate": nowStartDate,
            "endDate": nowEndDate
        }));
        console.log(productData.startDate);
        console.log(productData.endDate);
    }


        return (
            <div>
                <Header/>
                <div className="content_body">
                    <Container className={styles.box}>
                        <Row sm={1} md={2}>
                            <Col>
                                <Carousel>
                                    {_data && _data.images && _data.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <div className={styles.img_box}>
                                                <img src={image} className={styles.img} alt={`Image ${index}`}/>
                                            </div>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </Col>
                            <Col className={styles.info_text}>
                                <div className={styles.trade}>
                                    대여
                                </div>
                                <div className={styles.category}>
                                    {_data.category}
                                </div>
                                <div className={styles.title}>
                                    {_data.title}
                                </div>
                                <div className={styles.price}>
                                    {_data.price} <span className={styles.won}>원</span>
                                </div>
                                <div className={styles.like}>
                                    좋아요 : {_data.likeCount} 조회수 : {_data.viewCount}
                                </div>

                                {_data.major !== "" ?
                                    <div className={styles.tag_box}>
                                    <span className={styles.tag}>
                                        {_data.major}
                                    </span>
                                    </div> : null
                                }
                                <div className={styles.date}>
                                    <span>
                                    대여 가능한 날짜 :
                                </span>
                                    <span>
                                    {_data.startDate}
                                </span>
                                    <span>
                                    ~
                                </span>
                                    <span>
                                    {_data.endDate}
                                </span>
                                </div>

                                <CustomCalendar onSelectDate={handleSelectedDate} className={styles.calendar}/>
                                <div className={styles.btn}>
                                    <button className={styles.btn_like} onClick={btn_like}>좋아요</button>
                                    <Link to={"/chat"}>
                                        <button className={styles.btn_chat}>
                                            채팅하기
                                        </button>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container className={styles.box}>
                        <Row sm={1} md={2}>
                            <Col md={8} className={styles.txt}>
                                <div className={styles.detail_title}>
                                    상세정보
                                </div>
                                <div className={styles.detail_txt}>
                                    {_data.description}
                                </div>
                            </Col>
                            <Col md={4} className={styles.user_text}>
                                <div className={styles.detail_title}>
                                    판매자 정보
                                </div>
                                <div className={styles.user_name}>
                                    {_data.userNickname}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
