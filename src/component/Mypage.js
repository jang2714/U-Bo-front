import Container from "react-bootstrap/Container";
import styles from "../css/Mypage.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {useState} from "react";
import TradeContent from "./TradeContent";
import Wishlist from "./Wishlist";
import UserProfile from "./UserProfile";
import Header from "./Header";
import PasswordChange from "./PasswordChange";

export default function Mypage(){
    const [sideButton, setSideButton] = useState(1);

    const sidehandler = (index) => {
        setSideButton(index);
    };

    const handleButtonClick = (Key) => {
        setSideButton(Key)
        console.log(Key); // 변경 전의 값이 출력됩니다.
    }

    return (
        <div>
            <Header/>
            <div className="content_body">
            <Container className={styles.container}>
                <Row>
                    <Col xs={5} md={3} lg={2} className={styles.side_bar}>
                            <div className={styles.title}>
                                마이페이지
                            </div>
                        <div className={`${styles.side} ${
                            sideButton === 1 ? styles.selected : ""
                        }`} onClick={() => sidehandler(1)}>거래내역</div>
                        <div className={`${styles.side} ${
                            sideButton === 2 ? styles.selected : ""
                        }`} onClick={() => sidehandler(2)}>관심목록</div>
                        <div className={`${styles.side} ${sideButton === 3 ? styles.selected : ""} ${
                            sideButton === 4 ? styles.selected : ""
                        }`} onClick={() => sidehandler(3)}>내 정보</div>
                    </Col>
                    <Col md={9} lg={10}>
                        <div className={styles.body}>
                            {sideButton === 1 && <TradeContent />}
                            {sideButton === 2 && <Wishlist />}
                            {sideButton === 3 && <UserProfile sideButton={sideButton} onButtonClick={handleButtonClick}/>}
                            {sideButton === 4 && <PasswordChange onButtonClick={handleButtonClick}/>}
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}