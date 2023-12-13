import styles from "../css/Signup.module.css";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {Link, useNavigate} from "react-router-dom";
import left from "../img/left.png";
import right from "../img/right.png";
import complete from "../img/complete.png";
import {useEffect, useState} from "react";
import {AnimatePresence, motion, useAnimation} from 'framer-motion';
import SignupContent1 from "./SignupContent1";
import SignupContent2 from "./SignupContent2";
import SignupContent3 from "./SignupContent3";
import examImg from "../img/hhh.jpeg";
import { APIURL } from "../config";

const variants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
        };
    },
};

const Slide = ({ children, direction }) => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start('enter');
        controls.start('center');
        controls.start('exit');
    }, [controls, direction]);

    return (
        <AnimatePresence>
            <motion.div
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 } }}
                style={{ width: '100%', height: '100%' }}
                onAnimationComplete={() => controls.start('center')}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default function SignupBox(){

    const [userSignSecond, setUserSignSecond] = useState({
        // image: [],
        email: '',
        password: '',
        nickname: '',
        college: '',
    })


    const [isLoading, setIsLoading] = useState(false);
    const [direction, setDirection] = useState(1); // 1: 다음, -1: 이전
    const [step, setStep] = useState(1);
    const navigate = useNavigate();





    const nextStep = () => {
        setDirection(1);
        setStep(step + 1);
        console.log(step);
        if(step === 3) {


            if (!isLoading) {
                setIsLoading(true);
                // const formData = new FormData();
                // formData.append('email', userSignSecond.email);
                // formData.append('password', userSignSecond.password);
                // formData.append('nickname', userSignSecond.nickname);
                // formData.append('college', "연세대학교");
                // formData.append('image', userSignSecond.image[0]); // 이미지 파일 추가
                // fetch(`${APIURL}/signup`, {
                //     method: 'POST', // 'GET'에서 'POST'로 변경
                //     headers: {
                //         'Content-Type': 'application/json',
                //         // Add any other headers if needed
                //     },
                //     body: userSignSecond ? JSON.stringify(userSignSecond) : null,
                //
                // })
                //     .then((res) => {
                //         if (res.ok) {
                //             return res.text();
                //         } else {
                //             throw new Error('로그인 실패');
                //         }
                //     })
                //     .then((data) => {
                //         setIsLoading(false);
                //     })
                //     .catch(error => {
                //         console.error('Error during fetch:', error);
                //         alert("회원가입 실패!");
                //         setIsLoading(false);
                //     });

                alert("환영합니다! 중고로운 평화나라에 어서오세요!!");
                navigate("/");

            }
        }
    };

    const updateSignupDataFirst = (data) => {
        setUserSignSecond({...userSignSecond, ...data});
        console.log(userSignSecond);
    }

    const updateSignupDateSecond = (data) => {
        setUserSignSecond({...userSignSecond, ...data});
        console.log(userSignSecond);
    }

    const prevStep = () => {
        setDirection(-1);
        setStep(step - 1);
        console.log(step);
        if(step === 1){
            navigate("/");
        }
    };

    return(
        <div className={styles.body}>
            <Container className={styles.container}>
                <div className={styles.content}>
                    <h5 className={styles.title}>
                        회원가입
                    </h5>
                        {step === 1 && (
                            <Slide direction={direction}>
                                <SignupContent1 onUpdateUserSign={updateSignupDataFirst}/>
                            </Slide>
                        )}
                        {step === 2 && (

                            <Slide direction={direction}>
                                <SignupContent2 onUpdateUserSign={updateSignupDateSecond}/>
                            </Slide>
                        )}
                    {step === 3 && (
                        <Slide direction={direction}>
                            <SignupContent3/>
                        </Slide>
                    )}
                    <div className={styles.btn}>
                        <div className={styles.btn_back} onClick={prevStep}>
                            <img src={left} className={styles.btn_img}/>
                            이전
                        </div>
                        <div className={styles.btn_next} onClick={nextStep}>
                            {step === 3 ? (
                                <>
                                    완료<img src={complete} className={styles.btn_img} />
                                </>
                            ) : (
                                <>
                                    다음<img src={right} className={styles.btn_img} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    );
}