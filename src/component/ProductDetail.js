import Carousel from 'react-bootstrap/Carousel';
import image from '../img/examImg.png';
import {Link, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import dummy from '../db/data.json';
import styles from '../css/ProductDetail.module.css';
import imagelogo from "../img/logo.png";
import Header from "./Header";
import useFetch from "../hook/useFetch";
export default function ProductDetail() {
    const {id}  = useParams();

    const {data, loading, error} = useFetch(`used/${id}`);
    const _data = data;
    const categoryindex = ["BOOK","TOOL", "ETC", "HOUSE", "BUY"];
    const categoryText = ["서적", "실습도구","기타", "부동산", "삽니다"];

    const btn_like = () => {
        alert("죠습니다!");
    };


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
                        좋아요 : {_data.likeCount}  조회수 : {_data.viewCount}
                    </div>
                    {_data.major !== "" ?
                        <div className={styles.tag_box}>
                        <span className={styles.tag}>
                            {_data.major}
                        </span>
                        </div> : null
                    }

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
