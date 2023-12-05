import Container from "react-bootstrap/Container";
import styles from "../css/Chat.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dummy from "../db/data.json";
import maru from "../img/maru.JPG";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import ChatBtn from "./ChatBtn";
import Chating from "./Chating";
import Header from "./Header";

export default function Chat(){
    const data = dummy.chat;
    const [selectedButtons, setSelectedButtons] = useState(new Array(data.length).fill(false));
    const [selectedAction, setSelectedAction] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const selectedData = [...data].filter(data=>(
        data.id === Number(selectedId)
    ));

    const handleButtonClick = (index) => {
        setSelectedAction(true);
        setSelectedId(index + 1);
        const newSelectedButtons = new Array(data.length).fill(false);
        newSelectedButtons[index] = true;
        setSelectedButtons(newSelectedButtons);
        // 클릭한 버튼의 상태를 변경
    };


    return (
        <div>
            <Header/>
            <div className="content_body">
            <Container className={styles.container}>
                <Row className="gx-0">
                    <Col>
                        <div className={styles.chat_border}>
                            <div  className={styles.title}>
                                채팅
                            </div>
                            <div>
                                <ChatBtn data={data} selectedButtons={selectedButtons} onButtonClick={handleButtonClick}/>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        {selectedAction ?
                            <div>
                                <Chating user={selectedData[0]} index={selectedId}/>
                            </div>
                            :
                            <div className={styles.chating_box}>
                                대화방을 선택해주세요
                            </div>
                        }

                    </Col>
                </Row>
            </Container>
            </div>
        </div>

    );
}