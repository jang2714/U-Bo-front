import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import examImg from "../img/examImg.png";
import styles from './../css/ProductList.module.css';
import {useState} from 'react';
import {Link} from "react-router-dom";

export default function ProductList ({data, item}){
    // const [item, setItem] = useState();
    // // const data = props.data;

    return (
                <Link to={`/${item}/${data.id}`} className={styles.card_link}>
                    <div className={`${styles.card_ani} ${styles.hoverEffect}`}>
                            <img className={styles.image} src={data.image} alt="Exam Image" />
                        <div className={styles.card_content}>
                            <div>
                                {data.itemStatus === "거래 중" ? (
                                    <span className={styles.status_trading}>거래 중</span>
                                ) : null}
                                {data.itemStatus === "거래 완료" ? (
                                    <span className={styles.status_complete}>거래 완료</span>
                                ) : null}
                                {data.title}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{data.price}원</span>

                                <span className={styles.time_text}>{data.timeAgo}</span>
                            </div>
                            {data.major === "" ?
                                (
                                    <div className={styles.tag_null}></div>
                                )
                                : (
                                <span className={styles.tag}>{data.major}</span>
                            )}
                        </div>
                    </div>
                </Link>

    );
}