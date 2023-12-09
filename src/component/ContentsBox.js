import ProductList from "./ProductList";
import {Col, Container, Row} from "react-bootstrap";
import styles from "../css/ProductBoard.module.css";
import dummy from "../db/data.json";
import React, {useEffect, useState} from "react";
import useFetch from "../hook/useFetch";
export default function ContentsBox(props){

    const {data, loading, error} = useFetch(`home/${props.item}`);

    const _data = data.slice(0, 6);

    const index = ["product_board", "rental_board"];
    const [item, setItem] = useState('');

    useEffect(() => {
        if(props.item === "popular"){
            setItem(index[0])
        }else if(props.item === "used"){
            setItem(index[0]);
        }else{
            setItem(index[1]);
        }
    }, [props]);


    return (
        <>
            <Container style={{ overflowX: 'auto' }}>
                <Row xs={2} md={3} lg={6}>
                    {/* xs: Extra Small, md: Medium, lg: Large */}
                    {_data.map((data) => (
                        <Col className={styles.card}>
                            <ProductList data={data} item={item}/>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}