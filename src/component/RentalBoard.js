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
import Form from "react-bootstrap/Form";
import close from "../img/close.png";
export default function ProductBoard (){

    const [selectedSort, setSelectedSort] = useState("new");
    const [insertSort, setInsertSort] = useState("");

    const [tag, setTag] = useState('');
    const tagRef = useRef(null);

    const {data, loading, error} = useFetch("rental" + insertSort);
    const _data = data;

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
            <Container className={styles.container}>
                <h3>대여</h3>
                <Row>
                    <Col xs={2} className={styles.tag}>
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
                    <Col xs={4} className={styles.tag_box}>
                        {tag !== '' ? (
                            <span className={styles.tag_text}>
                                  <span className={styles.close} onClick={closeTag}>
                                    <img src={close} className={styles.close_img} />
                                  </span>
                                {tag}
                                </span>
                        ) : null}
                    </Col>
                    <Col >
                        <SortDropdown selected={selectedSort} onSelect={handleSort} variant="#84CEE2"/>
                    </Col>
                </Row>
                <Row xs={2} md={3} lg={4}>
                    {/* xs: Extra Small, md: Medium, lg: Large */}
                    {_data.map((data, index) => (
                        <Col key={index} className={styles.card}>
                            <ProductList data={data} index={index} item="rental_board"/>
                        </Col>
                    ))}
                </Row>
            </Container>
            </div>
        </div>
    );
}