import styles from "../css/UserProfile.module.css";
import Container from "react-bootstrap/Container";
import maru from "../img/maru.JPG";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import useFetch from "../hook/useFetch";
export default function UserProfile({ sideButton, onButtonClick }){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {data, loading, error} = useFetch(`user/account`);
    const _data = data;
    const [name, setName] = useState(data ? data.nickname : '');

    useEffect(() => {
        if (data && data.nickname) {
            setName(data.nickname);
        }
    }, [data]);

    const handleChange = (e) =>{
        setName(e.target.value);
    }

    const btnSave = () => {

        const jsonData = {
            nickname: name,
        }
        console.log(jsonData);

        if (!isLoading) {
            setIsLoading(true);
            fetch(`http://172.111.115.182:8080/user/account`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData ? JSON.stringify(jsonData) : null,
                // credentials: 'include',
            })
                .then((res) => {
                    if (res.ok) {
                        alert("변경되었습니다.");
                        return res.text();
                    } else {
                        throw new Error('변경실패');
                    }
                    setIsLoading(false);

                })
                .catch(error => {
                    console.error('Error during fetch:', error);
                    setIsLoading(false);
                });
        }
    };

    const btnExit = () =>{
        let isExit = window.confirm("정말 탈퇴하시겠습니까?")
        if(isExit){
            alert('탈퇴되었습니다.')
            navigate("/");
        }

    }
    const passwordChange = () => {
        onButtonClick(4);
    }

    return (
        <div className={styles.container}>
            <Container className={styles.box}>
                <div className={styles.content_box}>
                <img src={maru} className={styles.img}/>
                <Stack className={styles.box_info}>
                    <div className="p-2">
                        <div className={styles.university}>
                            {_data.college}
                        </div>
                    </div>
                    <div className={styles.text}>
                        <div className="p-2">
                            <Form.Label htmlFor="name" className={styles.info}>닉네임</Form.Label>
                            <Form.Control
                                type="text"
                                id="name"
                                aria-describedby="passwordHelpBlock"
                                value={name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="p-2">
                            <Form.Label htmlFor="email" className={styles.info}>이메일</Form.Label>
                            <Form.Control
                                type="text"
                                id="email"
                                aria-describedby="passwordHelpBlock"
                                value={_data.email}
                                disabled
                                readOnly
                            />
                        </div>
                    </div>
                </Stack>
                </div>
            <div className={styles.btn}>
                <Stack direction="horizontal" gap={2}>
                    <div className={styles.btn_save}>
                        <div className={styles.save} onClick={btnSave}>저장하기</div>
                    </div>
                    <div className={styles.link} onClick={passwordChange}>
                        <div className={styles.btn_passwd}>
                            <div className={styles.save}>비밀번호변경</div>
                        </div>
                    </div>
                    <div className="ms-auto">

                    </div>
                    <Button className={styles.btn_exit} variant="pills" onClick={btnExit}>탈퇴하기</Button>

                </Stack>
            </div>
            </Container>
        </div>
    );
}