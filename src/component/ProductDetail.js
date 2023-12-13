import Carousel from 'react-bootstrap/Carousel';
import image from '../img/examImg.png';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import dummy from '../db/data.json';
import styles from '../css/ProductDetail.module.css';
import imagelogo from "../img/logo.png";
import Header from "./Header";
import useFetch from "../hook/useFetch";
import img_favorite from "../img/Favorite.png";
import img_favorite_un from "../img/Favorite_un.png";
import {useEffect, useState} from "react";
import { APIURL } from "../config";
export default function ProductDetail() {
    const {id}  = useParams();

    const {data, loading, error} = useFetch(`used/${id}`);
    const [_data, set_data] = useState(data);
    const categoryindex = ["BOOK","TOOL", "ETC", "HOUSE", "BUY"];
    const categoryText = ["서적", "실습도구","기타", "부동산", "삽니다"];

    const [likeImg, setLikeImg] = useState(false);
    const [likeNumber, setLikeNumber] = useState('');
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
                if(likeImg){
                    setLikeNumber(likeNumber - 1);
                }else{
                    setLikeNumber(likeNumber + 1);
                }
                //
                // fetch(`${URL}/used/${id}`,{
                //     method: 'GET',
                // }).then((res) => {
                //     if (!res.ok) {
                //         throw new Error("Network response was not ok");
                //     }
                //     return res.json();
                // })
                //     .then((data) => {
                //         set_data(data);
                //     })
                //     .catch((error) => {
                //         console.error("데이터 가져오기 오류:", error);
                //     });
            // }else{
            //
            // }

        }
    };

    const handleChat = () => {
        console.log("채팅하러 가봅시다!!")
    };

    useEffect(() => {
        setLikeImg(_data.liked)
    }, [_data]);

    useEffect(() => {
        set_data(data);
        setLikeNumber(_data.likeCount);
    }, [data]);

    return (
        <div>
            <Header/>
            <div className="content_body">
        <Container className={styles.box}>
            <Row xs={1} sm={1} md={1} lg={2}>
                <Col>
                    <Carousel>
                        {_data && _data.images && _data.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <div className={styles.img_box}>
                                    <img src={image} className={styles.img} alt={`Image ${index}`} />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                <Col className={styles.info_text}>
                    <div className={styles.trade}>
                        중고거래
                    </div>

                    {categoryText.map((text, index) => (
                        _data.category === categoryindex[index] && (
                            <div className={styles.category} key={index}>
                                {text}
                            </div>
                        )
                    ))}
                    <div className={styles.title}>
                        {_data.title}
                    </div>
                    <div className={styles.price}>
                        {_data.price} <span className={styles.won}>원</span>
                    </div>
                    <div className={styles.like}>
                        좋아요 : {likeNumber}  조회수 : {_data.viewCount}
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

                    <div className={styles.btn}>
                        <span onClick={btn_like} className={styles.btn_like}>
                            <img src={likeImg ? img_favorite : img_favorite_un} className={styles.btn_like_img}/>
                        </span>
                        <button className={styles.btn_chat} onClick={handleChat}>
                                채팅하기
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
        <Container className={styles.box}>
            <Row sm={1} md={2}>
                <Col md={8}  className={styles.txt}>
                    <div className={styles.detail_title}>
                        상세정보
                    </div>
                    {_data.category ==="BOOK" &&
                        <div className={styles.book}>
                            <div className={styles.book_text}>밑줄 흔적 : {_data.underlineTrace}</div>
                            <div className={styles.book_text}>필기 흔적 : {_data.writingTrace}</div>
                            <div className={styles.book_text}>겉표지 : {_data.coverCondition}</div>
                            <div className={styles.book_text}>이름 기입 : {_data.nameWritten}</div>
                            <div className={styles.book_text}>페이지 변색 : {_data.pageDiscoloration}</div>
                            <div className={styles.book_text}>페이지 훼손 : {_data.pageDamage}</div>
                        </div>
                    }

                    <div className={styles.detail_txt}>
                        {_data.description}
                    </div>
                </Col>
                <Col md={4}  className={styles.user_text}>
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
