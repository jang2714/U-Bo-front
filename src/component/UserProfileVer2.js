import styles from "../css/UserProfile.module.css";
import Container from "react-bootstrap/Container";
import maru from "../img/maru.JPG";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import React, {useState} from "react";
import {Link} from "react-router-dom";
export default function UserProfile(){
    const [name, setName] = useState("춘춘식이");
    const [onMouse, SetOnMouse] = useState();

    const handleChange = (e) =>{
        setName(e.target.value);
    }
    const onMouseEnter = () => {

    }

    const btnSave = () => {
        alert("저장되었습니다.");
    };

    return (
        <div className={styles.container}>
            <Container className={styles.box}>
                <img src={maru} className={styles.img}/>
                <Stack className={styles.box_info}>
                    <div className="p-2">
                        <div className={styles.university}>
                            명지전문대
                        </div>
                    </div>
                    <div className="p-2">
                        <Form.Label htmlFor="email">이메일</Form.Label>
                        <Form.Control
                            type="text"
                            id="email"
                            aria-describedby="passwordHelpBlock"
                            placeholder="prkq6336@mjc.ac.kr"
                            disabled
                            readOnly
                        />
                    </div>
                    <div className="p-2">
                        <Form.Label htmlFor="name">닉네임</Form.Label>
                        <Form.Control
                            type="text"
                            id="name"
                            aria-describedby="passwordHelpBlock"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                </Stack>
            </Container>
            <div className={styles.btn}>
                <Stack gap={2} className="col-md-6 mx-auto d-flex flex-column " >
                    <div className={styles.btn_save}><div className={styles.save} onClick={btnSave}>저장하기</div></div>
                    <Link to={"/"} className={styles.link}>
                        <div className={styles.btn_passwd}><div className={styles.save}>비밀번호변경</div></div>
                    </Link>
                    <Button className={styles.btn_exit} variant="outline-danger">회원탈퇴하기</Button>
                </Stack>
            </div>
        </div>
    );
}