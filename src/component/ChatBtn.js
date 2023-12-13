import React, { useState } from 'react';
import maru from '../img/maru.JPG'; // maru 이미지 경로에 따라 수정
import styles from '../css/Chat.module.css';
import Stack from 'react-bootstrap/Stack';

export default function ChatBtn ({ data, selectedButtons, onButtonClick  }) {
    const handleButtonClick = (index) => {
        onButtonClick(index);
    };

    return (
        <div style={{ overflowY: 'auto', height: '650px', borderTop: '1px solid #ababab', borderBottom: '1px solid #ecebeb'}}>
            {data.map((_data, index) => (
                <div
                    key={index}
                    style={{
                        padding: '12.5px',
                        backgroundColor: selectedButtons[index] ? '#ecebeb' : '#fff',
                        color: '#000',
                        cursor: 'pointer',
                        width: '100%',
                        height: '95px',
                        borderBottom: '1px solid #ecebeb'
                    }}
                    onClick={() => handleButtonClick(index)}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={maru} alt="userImg" className={styles.btn_img} />
                        <span className={styles.txt}>
                            <div>
                              <span className={styles.name}>
                                {_data.buyer}
                              </span>
                              <span className={styles.date}>
                                {_data.date}
                              </span>
                            </div>
                            <span>
                              <div className={styles.text}>
                                {_data.text}
                              </div>
                            </span>
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

