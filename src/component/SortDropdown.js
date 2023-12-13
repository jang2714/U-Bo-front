
import { NavDropdown} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import styles from '../css/SortDropDown.module.css';
import {useState} from 'react';

export default function SortDropdown({selected, onSelect}){

    const [sortText, setSortText] = useState("최신순");

    const handleSelect = (e) => {
        onSelect(e);
        if (e === "new"){
            setSortText("최신순");
        }else if(e === "max_price"){
            setSortText("높은가격순");
        }else if(e === "min_price"){
            setSortText("낮은가격순");
        }

    }

    return (
        <div>
            <style type="text/css">
                {`
          #dropdown-button {
            color: black !important; 
            border: 1px solid lightgrey;
            border-radius: 8px;
            background-color: white;
            // width: 110px;
          }
        `}
            </style>
            <DropdownButton id="dropdown-button" title={sortText} className={styles.dropdown} onSelect={handleSelect} variant="pills">
                <Dropdown.Item eventKey="new" >최신순 </Dropdown.Item>
                <Dropdown.Item eventKey="min_price" >낮은가격순 </Dropdown.Item>
                <Dropdown.Item eventKey="max_price">높은가격순 </Dropdown.Item>
            </DropdownButton>
        </div>
    );
}