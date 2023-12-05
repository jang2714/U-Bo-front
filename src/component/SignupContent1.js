import styles from "../css/Signup.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function SignupContent1({onUpdateUserSign}){
    const [userFirst, setUserFirst] = useState({
        // image: [],
        nickname: '',
        college: '',
    })

    const handleInsert = (data) => {
        // if (data.target.name === "image") {
        //     const file = data.target.files[0];
        //     setUserFirst({ ...userFirst, [data.target.name]: [...userFirst.image, data.target.files[0]] });
        //     onUpdateUserSign({ ...userFirst, [data.target.name]: [...userFirst.image, data.target.files[0]] });
        //     console.log(file instanceof File);
        //     console.log(file)
        // } else {
        //
        // }
        setUserFirst({ ...userFirst, [data.target.name]: data.target.value });
        onUpdateUserSign({ ...userFirst, [data.target.name]: data.target.value });
    };
    useEffect(() => {
        onUpdateUserSign(userFirst);
    }, [userFirst]); // onUpdateUserSign은 의존성 배열에 추가할 필요 없음



    // const handleInsertImg = (e) => {
    //     const file = e.target.file[0];
    //     setUserFirst({...userFirst, image: file});
    //     onUpdateUserSign(userFirst);
    // }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setUserFirst({ ...userFirst, [event.target.name]: [...userFirst.image, ...event.target.value] });
        // onUpdateUserSign({ ...userFirst, image: file }); // 이미지 변경 시 상위 컴포넌트로 전달
        console.log(typeof file);
        console.log(file);
    };

    return(
        <div>
            <div className={styles.content_box}>
                <div className={styles.form}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <div className={styles.text_align}>
                            <Form.Label className={styles.txt}>프로필 사진을 넣어주세요</Form.Label>
                        </div>
                        <Form.Control
                            type="file"
                            name="image"
                            // onChange={handleInsert}
                        />
                    </Form.Group>

                    <FloatingLabel
                        controlId="floatingInput"
                        label="닉네임"
                        className="mb-4"
                    >
                        <Form.Control
                            type="text"
                            placeholder="e-mail"
                            className={styles.text}
                            name="nickname"
                            value={userFirst.nickname}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="학교"
                                   className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Password"
                            className={styles.text}
                            name="college"
                            value={userFirst.college}
                            onChange={handleInsert}
                        />
                    </FloatingLabel>
                </div>
            </div>
        </div>
    );
}