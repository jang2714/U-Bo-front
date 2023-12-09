import styles from "../css/ProductCreate.module.css";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import { CloseButton } from 'react-bootstrap';
import Header from "./Header";
import useFetch from "../hook/useFetch";
import {useEffect, useState} from "react";
import { APIURL } from "../config";

export default function ProductCreate() {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState([]);
    const [selectedCategory, setselectedCategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState({
        title: '',
        category: '',
        price: '',
        description: '',
        major: '',
        images: [],
    });

    const handleInsertChange = (e) => {
        if (e.target.name === "images") {
            // 이미지 파일 업로드 로직 제거
            setProductData({ ...productData, [e.target.name]: [...productData.images, ...e.target.files] });
        } else if (e.target.name === "price") {
            // price 필드일 경우 숫자로 변환하여 업데이트
            const rawValue = e.target.value.replace(/,/g, ''); // 쉼표 제거
            const parsedValue = parseInt(rawValue, 10);

            // 유효한 값인 경우 숫자로 변환, 그렇지 않으면 0으로 설정
            const formattedPrice = isNaN(parsedValue) ? 0 : parsedValue.toLocaleString();

            setProductData({ ...productData, [e.target.name]: formattedPrice });
        }  else {
            setProductData({ ...productData, [e.target.name]: e.target.value });
        }
    };

    useEffect(() => {
        // images 배열이 업데이트될 때마다 이미지 업데이트
        const newImageSrc = productData.images.map((file) => URL.createObjectURL(file));
        setImageSrc(newImageSrc);

        // Clean up URL.createObjectURL on component unmount
        return () => {
            newImageSrc.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [productData.images]);

    const handleImageRemove = (index) => {
        const updatedImages = [...productData.images];
        updatedImages.splice(index, 1);
        setProductData({ ...productData, images: updatedImages });
    };


    function handleClick(e) {
        e.preventDefault();

        if (!isLoading) {
            setIsLoading(true);

            const formData = new FormData(); // 멀티파트 폼 데이터 생성

            // 이미지 파일들을 formData에 추가
            productData.images.forEach((image, index) => {
                formData.append(`images`, image);
            });

            // 나머지 텍스트 데이터를 formData에 추가
            formData.append('title', productData.title);
            formData.append('category', productData.category);
            formData.append('price', productData.price);
            formData.append('description', productData.description);
            formData.append('major', productData.major);

            fetch(`${APIURL}/used/new`, {
                method: 'POST',
                body: formData, // 멀티파트 폼 데이터를 전송
                // credentials: 'include',
            })
                .then((res) => {
                    if (res.ok) {
                        alert("생성이 완료 되었습니다.");
                        navigate(`/product_board`);
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    console.error('Error during fetch:', error);
                    setIsLoading(false);
                });
        }
    }

    return (
        <div>
            <Header/>
            <div className="content_body">
            <Container className={styles.container}>
                <h3>중고물품등록</h3>
                <Form className={styles.form}>
                    <Form.Group as={Row} className="mb-4" controlId="formFileMultiple">
                        <Form.Label column sm={2}>물품이미지</Form.Label>
                        <Col sm={2}>
                            <input
                                type="file"
                                className={styles.custom_file_input}
                                onChange={handleInsertChange
                                // (e) => {
                                //     encodeFileToBase64(e.target.files[0]);}
                            }
                                name="images"
                            />
                        </Col>
                        <Col sm={8} className="text-start" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <div className={styles.img_box}>
                            {imageSrc && imageSrc.map((image, index) => (
                                <span key={index} className={styles.img_content}>
                                    <img className={styles.img} src={image} alt={`preview-img-${index}`} />
                                    <CloseButton
                                        className={styles.img_close_btn}
                                        onClick={()=>handleImageRemove(index)}
                                    />
                                </span>
                            ))}
                        </div>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            물품명
                        </Form.Label>
                        <Col sm={4}>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={productData.title}
                                onChange={handleInsertChange}
                                name="title"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalCategory">
                        <Form.Label column sm={2}>
                            카테고리
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Select
                                aria-label="Default select example"
                                name="category"
                                value={productData.category}
                                onChange={handleInsertChange}
                            >
                                <option>선택</option>
                                <option value="BOOK">서적</option>
                                <option value="TOOL">실습도구</option>
                                <option value="ETC">기타</option>
                                <option value="HOUSE">부동산</option>
                                <option value="BUY">삽니다</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalPrice">
                        <Form.Label column sm={2}>
                            가격
                        </Form.Label>
                        <Col sm={3}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInsertChange}
                                />
                                <InputGroup.Text>원</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <div className={`${styles.transitionContainer} ${productData.category === 'BOOK' ? styles.fadeIn : styles.fadeOut}`}>
                        {productData.category === 'BOOK' && (
                            <Form.Group as={Row} className="mb-3">
                                <Form.Label as="legend" column sm={2}>
                                    서적상태
                                </Form.Label>
                                <Col sm="8" className="text-start">
                                    <div className={styles.category_text}>
                                        <div key={`inline-radio-underline`} className="mb-3">
                                            <span className={styles.state_txt}>밑줄 흔적</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="underlineTrace"
                                                type="radio"
                                                id="under_line_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="연필/샤프"
                                                name="underlineTrace"
                                                type="radio"
                                                id="under_line_2"
                                            />
                                            <Form.Check
                                                inline
                                                label="볼펜/형광펜"
                                                name="underlineTrace"
                                                type="radio"
                                                id="under_line_3"
                                            />
                                        </div>
                                        <div key={`inline-radio-write`} className="mb-3">
                                            <span className={styles.state_txt}>필기 흔적</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="writeTrace"
                                                type="radio"
                                                id="write_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="연필/샤프"
                                                name="writeTrace"
                                                type="radio"
                                                id="write_2"
                                            />
                                            <Form.Check
                                                inline
                                                label="볼펜/형광펜"
                                                name="writeTrace"
                                                type="radio"
                                                id="write_3"
                                            />
                                        </div>
                                        <div key={`inline-radio-cover`} className="mb-3">
                                            <span className={styles.state_txt}>겉표지</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="coverCondition"
                                                type="radio"
                                                id="cover_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="있음"
                                                name="coverCondition"
                                                type="radio"
                                                id="cover_2"
                                            />
                                        </div>
                                        <div key={`inline-radio-name`} className="mb-3">
                                            <span className={styles.state_txt}>이름 기입</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="nameWritten"
                                                type="radio"
                                                id="name_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="있음"
                                                name="nameWritten"
                                                type="radio"
                                                id="name_2"
                                            />
                                        </div>
                                        <div key={`inline-radio-discoloration`} className="mb-3">
                                            <span className={styles.state_txt}>페이지 변색</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="pageDiscoloration"
                                                type="radio"
                                                id="discoloration_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="있음"
                                                name="nameWritten"
                                                type="radio"
                                                id="discoloration_2"
                                            />
                                        </div>
                                        <div key={`inline-radio-damage`} className="mb-3">
                                            <span className={styles.state_txt}>페이지 훼손</span>
                                            <Form.Check
                                                inline
                                                label="없음"
                                                name="pageDamage"
                                                type="radio"
                                                id="damage_1"
                                            />
                                            <Form.Check
                                                inline
                                                label="있음"
                                                name="pageDamage"
                                                type="radio"
                                                id="damage_2"
                                            />
                                        </div>
                                    </div>

                                </Col>
                            </Form.Group>
                        )
                        }
                    </div>

                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalDetail">
                        <Form.Label  column sm={2}>상세정보</Form.Label>
                        <Col  sm={8}>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="description"
                                value={productData.description}
                                onChange={handleInsertChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4" controlId="formHorizontalTag">
                        <Form.Label column sm={2}>
                            학과태그
                        </Form.Label>
                        <Col sm={6}>
                            <Form.Control
                                type="text"
                                placeholder="학과를 입력하세요"
                                name="major"
                                value={productData.major}
                                onChange={handleInsertChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-4">
                        <Col sm={{ span: 11, offset: 1 }} className={styles.btn_align}>
                            <Button type="submit" className={styles.btn} onClick={handleClick}>등록하기</Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Container>
            </div>
        </div>

    );
}
