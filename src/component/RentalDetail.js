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
import {useEffect, useState} from "react";
import img_favorite from "../img/Favorite.png";
import img_favorite_un from "../img/Favorite_un.png";
import {APIURL} from "../config";
export default function RentalDetail() {
    const {id} = useParams();

    const [productData, setProductData] = useState({
        startDate: '',
        endDate: '',
    });
    const {data, loading, error} = useFetch(`rental/${id}`);
    const _data = data;

    const [likeImg, setLikeImg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const itemId = {id: id};

    const btn_like = () => {
        setLikeImg(!likeImg);

        if (!isLoading) {
            setIsLoading(true);
            // if(likeImg){
            fetch(`${APIURL}/like/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemId),
            }).then((res) => {
                if (res.ok) {
                    setIsLoading(false);
                    return res.text();
                } else {
                    throw new Error("좋아요 실패");
                }
            }).catch(error => {
                console.error('Error during fetch:', error);
                alert("좋아요 실패!");
                setIsLoading(false);
            });
            // }else{
            //
            // }

        }
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

    useEffect(() => {
        setLikeImg(_data.liked)
    }, [_data]);


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

                                <div className={styles.tag_box}>
                                    <span className={styles.time_text}>
                                        {_data.timeAgo}
                                    </span>
                                            {_data.major !== "" ?
                                                <span className={styles.tag}>
                                            {_data.major}
                                        </span> : null
                                                }
                                </div>
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
                                    <span onClick={btn_like} className={styles.btn_like}>
                                        <img src={likeImg ? img_favorite : img_favorite_un} className={styles.btn_like_img}/>
                                    </span>
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
