import styles from "../css/FindPasswd.module.css";
import Container from "react-bootstrap/Container";
import CustomCalendar from "./CustomCalendar";
import {useState} from "react";
import Calendar from "react-calendar";
import moment from "moment";
export default function FindPasswd(){




    const handleCalendar = () => {

    };

    return (
        <div className={styles.body}>
            <Container className={styles.container}>
                <div className={styles.content_box}>
                    <div>
                        비밀번호 찾기
                        <CustomCalendar/>
                    </div>
                </div>
            </Container>
        </div>
    );
}