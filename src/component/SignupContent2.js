import styles from "../css/Signup.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import useFetch from "../hook/useFetch";
import {useEffect, useState} from "react";

export default function Signup({onUpdateUserSign}){
    const [userSecond, setUserSecond] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        onUpdateUserSign(userSecond);
    }, [userSecond]);
    const handleInsert = (e) => {
        setUserSecond({ ...userSecond, [e.target.name]: e.target.value });
        onUpdateUserSign({ ...userSecond, [e.target.name]: e.target.value });
    }

    return(
        <div>
            <div className={styles.content_box}>
                <div className={styles.form}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="이메일"
                        className="mb-4"
                    >
                        <Form.Control
                            type="email"
                            placeholder="e-mail"
                            className={styles.text}
                            name="email"
                            value={userSecond.email}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="비밀번호"
                                   className="mb-4">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            className={styles.text}
                            name="password"
                            value={userSecond.password}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPasswordCheck" label="비밀번호 확인"
                    >
                        <Form.Control
                            type="password"
                            placeholder="PasswordCheck"
                            className={styles.text}/>
                    </FloatingLabel>
                </div>
            </div>
        </div>
    );
}