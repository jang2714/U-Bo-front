import styles from "../css/PasswordChange.module.css";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {useState} from "react";
export default function PasswordChange({onButtonClick}){

    const [user, setUser] = useState({
        id: '',
        password: '',
    });

    const handleInsert = (e) => {
        setUser()
    }

    const ButtonSubmit = () => {
        alert("변경되었습니다.");
        onButtonClick(3);
    }

    const ButtonExit = () => {
        onButtonClick(3);
    }

    return (
        <div className={styles.container}>
            <Container className={styles.box}>
                    <div className={styles.title_text}>
                        비밀번호 변경
                    </div>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="현재 비밀번호"
                        className="mb-3"
                    >
                        <Form.Control
                            type="password"
                            placeholder="현재 비밀번호"
                            className={styles.text}
                            name="id"
                            value={user.id}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="새 비밀번호" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="새 비밀번호"
                            className={styles.text}
                            name="password"
                            value={user.password}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="새 비밀번호 확인" className="mb-3">
                        <Form.Control
                            type="password"
                            placeholder="새 비밀번호 확인"
                            className={styles.text}
                            name="password"
                            value={user.password}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                <div className={styles.btn}>
                    <div className={styles.btn_submit} onClick={ButtonSubmit}>
                        비밀번호 변경
                    </div>
                    <div className={styles.btn_exit} onClick={ButtonExit}>
                        취소
                    </div>
                </div>
            </Container>
        </div>
    );
}