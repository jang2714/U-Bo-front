import styles from "../css/Signup.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";

export default function SignupContent3(){
    return(
        <div>
            <div className={styles.content_box}>
                <div className={styles.form}>
                    <div className={styles.form_complete}>
                        <Form.Label htmlFor="inputPassword5" className={styles.form_name}>인증번호</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            className={styles.text_complete}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            <div>해당 이메일로 인증 번호를 보냈습니다.</div>
                            인증 번호를 입력해주세요
                        </Form.Text>
                    </div>

                </div>
            </div>
        </div>
    );
}