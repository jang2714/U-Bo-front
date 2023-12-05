import styles from "../css/TradeContent.module.css";
import Nav from "react-bootstrap/Nav";
import dummy from "../db/data.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SortDropdown from "./SortDropdown";
import ProductList from "./ProductList";
import {useState} from "react";
import useFetch from "../hook/useFetch";

export default function TradeContent(){
    // const data = dummy.item;
    const [selectedNav, setSelectedNav] = useState("판매");
    const [selectedState, setSelectedState] = useState("전체");
    const [handleState, setHandleState] = useState("sell");
    const [item, setItem] = useState("product_board")
    const [selectedSort, setSelectedSort] = useState("");

    const {data, loading, error} = useFetch(`user/${handleState}${selectedSort}`);
    const _data = data;


    const handleSelect = (selectedKey) => {
        setSelectedNav(selectedKey);
        if(selectedKey === "중고거래"){
            setHandleState("sell");
            setItem("product_board");
        }else if(selectedKey === "대여"){
            setHandleState("rental");
            setItem("rental_board");
        }
    };
    const handleSort = (selectedKey) => {
        if(selectedKey === "new"){
            setSelectedSort("");
        }else{
            setSelectedSort(`?sort=${selectedKey}`);
        }
        // setSelectedSort(selectedKey);
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                내가 거래한 상품
            </div>
            <Nav justify fill variant="underline" defaultActiveKey="중고거래" className={styles.nav} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="중고거래" className={styles.nav_color}>중고거래</Nav.Link>
                </Nav.Item>
                {/*<Nav.Item>*/}
                {/*    <Nav.Link eventKey="구매" className={styles.nav_color}>구매</Nav.Link>*/}
                {/*</Nav.Item>*/}
                <Nav.Item>
                    <Nav.Link eventKey="대여" className={styles.nav_color}>대여</Nav.Link>
                </Nav.Item>
            </Nav>
            <div className={styles.bar}>
                <span className={styles.length}>
                    {_data ? `${_data.length} 개의 상품` : '0 개의 상품'}
                </span>
                <span className={styles.sortDown}>
                    <SortDropdown onSelect={handleSort}/>
                </span>
            </div>
            <Container className={styles.content}>
                <Row xs={2} md={2} lg={4}>
                    {_data.map((data, index)=>(
                        <Col key={index} className={styles.card}>
                            <ProductList data={data} index={index} item={item} />
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
}