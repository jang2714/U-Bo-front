
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "../css/Header.module.css";
import logo from "../img/logo.png";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {NavDropdown} from "react-bootstrap";

export default function Header() {
    const [searchText, setSearchText] = useState("");

    const navigate = useNavigate();
    const inputRef = useRef();

    const handleSearch = () => {
        const search = searchText;
        navigate(`/search/${search}`);
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        console.log(e.target.value)
    };

    return (
        <>
            <style type="text/css">{`
            
            #title{
                margin-bottom: 10px
            }
            #nav{
                width: 1150px;
            }
            #search{
                margin-right: 10px;
            }
            `
            }</style>
                <Navbar key='md' expand='lg'  fixed="top" bg='white' className={styles.shadow}>
                    <Container fluid id="nav">
                        {/*<Navbar.Brand href="/" id="title"> U-Bo</Navbar.Brand>*/}
                        <Navbar.Brand href="/home" id="title">
                            <img
                                alt=""
                                src={logo}
                                width="110"
                                height="40"
                                className="d-inline-block align-top"
                            />{' '}
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-md`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                                    우리 학교 보따리상
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="me-auto flex-grow-1 pe-3">
                                    <span className={styles.link_left}>
                                        <Nav.Link href="/product_board" id="link-left">중고거래</Nav.Link>
                                    </span>
                                    <span className={styles.link_left}>
                                        <Nav.Link href="/rental_board" id="link-left">대여</Nav.Link>
                                    </span>
                                </Nav>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Form className="d-flex" id="search" onSubmit={handleSearch}>
                                        <Form.Control
                                            type="search"
                                            placeholder="물품을 검색하세요."
                                            className="me-2 form-control-sm"
                                            aria-label="search"
                                            value={searchText}
                                            onChange={handleInputChange}
                                            ref={inputRef}
                                        />
                                    </Form>
                                    <Nav>
                                        <NavDropdown id="dropdown-basic-button" title="등록">
                                            <Dropdown.Item href="/product_create" >중고거래 </Dropdown.Item>
                                            <Dropdown.Item href="/rental_create" >대여</Dropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Nav.Link href="/chat">채팅</Nav.Link>
                                    <Nav.Link href="/mypage">내정보</Nav.Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>

                </Navbar>
        </>
    );
}
