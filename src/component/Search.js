import styles from "../css/Search.module.css";
import Header from "./Header";
import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useFetch from "../hook/useFetch";
import {Col, Row} from "react-bootstrap";
import ProductList from "./ProductList";
import Nav from "react-bootstrap/Nav";
import SortDropdown from "./SortDropdown";
import Container from "react-bootstrap/Container";
export default function Search() {
    const location = useLocation();
    const searchText = location.state && location.state.data;
    const { search } = useParams();

    const [selectedNav, setSelectedNav] = useState('중고거래');
    const [selectedItem, setSelectedItem] = useState('중고거래');
    const [insertItem, setInsertItem] = useState('used');

    const { data, loading, error } = useFetch(`search/${insertItem}?q=` + search);

    const _data = data;
    console.log(_data);

    const handleSelect = (e) => {
        setSelectedNav(e);
        setInsertItem(e);
    }

    return (
        <div>
            <Header />
            <div className="content_body">
                <Container className={styles.container}>
                    <h3>
                        "{search}"의 검색결과
                    </h3>
                    <Nav justify fill variant="underline" defaultActiveKey="used" className={styles.nav} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey="used" className={styles.nav_color}>중고거래</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rental" className={styles.nav_color}>대여</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className={styles.bar}>
                        <span className={styles.length}>
                            {data.length} 개의 상품
                        </span>
                        {/*<span className={styles.sort_down}>*/}
                        {/*    <SortDropdown/>*/}
                        {/*</span>*/}
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