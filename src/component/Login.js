import styles from "../css/Login.module.css"
import Container from "react-bootstrap/Container";
import login_logo from "../img/login_logo.png";
import Stack from "react-bootstrap/Stack";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import useFetch from "../hook/useFetch";
export default function Login(){

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        loginId: '',
        password: '',
        });

    const handleInsert = (e) =>{
        setUser({...user, [e.target.name]: e.target.value});
        console.log(e.target.value);
    }

    function handleLogin(e) {
        if(user.loginId === ''){
            alert("아이디를 입력해주세요");
            console.log(user.id);
        }else if(user.password === ''){
            alert("비밀번호를 입력해주세요");
        }else{
            e.preventDefault();

                if (!isLoading) {
                    setIsLoading(true);

                    // login(user)
                    //     .then(data => {
                    //         // 로그인 성공 시 처리
                    //         console.log('로그인 성공:', data);
                    //         navigate('/homce');
                    //         setIsLoading(false);
                    //
                    //         // 여기에서 세션 등의 처리를 진행할 수 있습니다.
                    //     })
                    //     .catch(error => {
                    //         // 로그인 실패 시 처리
                    //         console.error('로그인 실패:', error);
                    //         alert("아이디 또는 비밀번호가 틀립니다.");
                    //         setIsLoading(false);
                    //
                    //         // 에러 처리 로직을 추가할 수 있습니다.
                    //     });

                    fetch(`http://172.111.115.182:8080/login`, {
                        method: 'POST', // 'GET'에서 'POST'로 변경
                        headers: {
                            'Content-Type': 'application/json', // 헤더에 Content-Type 추가
                        },
                        body: JSON.stringify(user),
                        // credentials: 'include',
                    })
                        .then((res) => {
                            if (res.ok) {
                                return res.text();
                            } else {
                                throw new Error('로그인 실패');
                            }
                        })
                        .then((data) => {
                                navigate(`/home`);
                                setIsLoading(false);
                        })
                        .catch(error => {
                            console.error('Error during fetch:', error);
                            alert("로그인 실패!");
                            setIsLoading(false);
                        });


                }

        }

    }
    // const login = async (credentials) => {
    //         const response = await fetch('http://192.168.219.157:8080/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(credentials),
    //             credentials: 'include',
    //         });
    //         console.log(credentials)
    //         return await response.json();
    //     };

    // const checkSession = async () => {
    //     const response = await fetch('http://192.168.219.157:8080/session-check', {
    //         credentials: 'include',
    //     });
    //     return await response.json();
    // };

    const idPassword = () => {
        alert("구현 중입니다.");
    }


    return (
        <div className={styles.body}>
            <Container className={styles.container}>
                <div className={styles.content_box}>
                    <img src={login_logo} alt="login logo" className={styles.img}/>
                    <div className={styles.form}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="ID"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                placeholder="ID"
                                className={styles.text}
                                name="loginId"
                                value={user.loginId}
                                onChange={handleInsert}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className={styles.text}
                                name="password"
                                value={user.password}
                                onChange={handleInsert}
                            />
                        </FloatingLabel>
                    </div>
                    <div className={styles.btn}>
                        <div className={styles.btn_login} onClick={handleLogin}>로그인</div>
                    </div>
                    <div className={styles.btn_two}>
                        <div className={styles.btn_findpw} onClick={idPassword}>
                            아이디/비밀번호찾기
                        </div>
                        <Link to="/signup_box" className={styles.btn_findpw}>
                            회원가입
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}