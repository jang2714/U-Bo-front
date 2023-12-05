import styles from '../css/Chating.module.css';
import dummy from '../db/data.json';
import img from "../img/examImg.png";
import Header from "./Header";
import React from "react";
export default function Chating({user, index}){
    const data = dummy.item.filter(data=>(
        data.id === user.id
    ))

    return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.name}>
                        {user.buyer}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                        <img src={img} className={styles.img}/>
                        <div className={styles.info_box}>
                            <div>
                                {data[0].title}
                            </div>
                            <div className={styles.price}>
                                {data[0].price}원
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.body}>

                </div>
                <div className={styles.footer}>
                    구현중입니다...
                </div>
            </div>
    );
}