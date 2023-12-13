import ProductList from "./ProductList";
import dummy from "../db/data.json";
import Container from 'react-bootstrap/Container';
import styles from "../css/ProductBoard.module.css";
import Nav from 'react-bootstrap/Nav';
import {useRef, useState} from "react";
import SortDropdown from "./SortDropdown";
import { Row, Col } from 'react-bootstrap';
import Header from "./Header";
import useFetch from "../hook/useFetch";
import Form from 'react-bootstrap/Form';
import close from "../img/close.png";
export default function ProductBoard (){

    const [tag, setTag] = useState('');
    let TagText = '';
    const tagRef = useRef(null);
    const [text, setText] = useState('');

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [insertCategory, setInsertCategory] = useState("");

    const [selectedSort, setSelectedSort] = useState("new");
    const [insertSort, setInsertSort] = useState("");


    const { data, loading, error } = useFetch(
        `used${!(insertCategory === "") ? `/${insertCategory}` : ''}${!(insertCategory === "") && !(insertSort === "") ? '?' : ''}${(insertCategory === "") && !(insertSort === "") ? '?' : ''}${!(insertSort === "") ? `sort=${insertSort}` : ''}`
    );

    const _data = data;


    const handleCategory = (selectedKey) => {
        if(selectedKey === "all"){
            setInsertCategory("");
        }else{
            setInsertCategory(selectedKey);
        }
        setSelectedCategory(selectedKey);
    };

    const handleSort = (selectedKey) => {
        if(selectedKey === "new"){
            setInsertSort("");
        }else{
            setInsertSort(selectedKey);
        }
        setSelectedSort(selectedKey);
    }

    const closeTag = () => {
        setTag('');
    };

    const insertTag = (e) => {
        e.preventDefault();
        console.log(setTag);
        setTag(tagRef.current.value);
    };

    return (
        <div>
            <Header/>
            <div className="content_body">
            <Container className={styles.customContainer}>
                <div className={styles.title}>중고거래</div>
                <Nav fill variant="underline" defaultActiveKey="all" className={styles.nav} onSelect={handleCategory}>
                    <Nav.Item>
                        <Nav.Link eventKey="all" className={styles.nav_color}>전체</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="book" className={styles.nav_color}>서적</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="tool" className={styles.nav_color}>실습도구</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="etc" className={styles.nav_color}>기타</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="house" className={styles.nav_color}>부동산</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="buy" className={styles.nav_color}>삽니다</Nav.Link>
                    </Nav.Item>
                </Nav>

                <div>
                    <Row  className={styles.noMargin}>
                        <Col xs={4} lg={2} className={styles.tag}>
                            <Form onSubmit={insertTag}>
                                <Form.Control
                                    type="text"
                                    id="tag"
                                    aria-describedby="passwordHelpBlock"
                                    placeholder="학과를 입력해주세요"
                                    ref={tagRef}
                                />
                            </Form>
                        </Col>
                        <Col xs={5} lg={7} className={styles.tag_box}>
                            {tag !== '' ? (
                                <span className={styles.tag_text}>
                                  <span className={styles.close} onClick={closeTag}>
                                    <img src={close} className={styles.close_img} />
                                  </span>
                                    {tag}
                                </span>
                            ) : null}
                        </Col>
                        <Col xs={1} lg={2} className={styles.sort_box}>
                            <SortDropdown selected={selectedSort} onSelect={handleSort} variant="#84CEE2"/>
                        </Col>
                    </Row>
                </div>

                <Row xs={2} md={3} lg={4}>
                    {/* xs: Extra Small, md: Medium, lg: Large */}
                    {_data.map((data, index) => (
                        <Col key={index} className={styles.card}>
                            <ProductList data={data} index={index} item="product_board"/>
                        </Col>
                    ))}
                </Row>
            </Container>
            </div>
        </div>
    );
}