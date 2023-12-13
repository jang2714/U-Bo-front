import Calendar from "react-calendar";
import moment from "moment/moment";
import React, {useEffect, useState} from "react";
import 'react-calendar/dist/Calendar.css';
import DropdownButton from "react-bootstrap/DropdownButton";
import styles from "../css/CustomCalentar.module.css";

export default function CustomCalendar ({ onSelectDate }) {

    const [nowStartDate, setStartNowDate] = useState("날짜를선택해주세요");
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    const [nowEndDate, setNowEndDate] = useState("날짜를선택해주세요");
    const [isEndOpen, setIsEndOpen] = useState(false);
    const [endDate, setEndDate] = useState(new Date());

    const handleStartToggleCalendar = () => {
        setIsStartOpen(!isStartOpen);
        setIsEndOpen(false);
    };
    const handleStartDateChange = (startDate) => {
        setStartDate(startDate);
        setStartNowDate(moment(startDate).format("YYYY-MM-DD"));
        setIsStartOpen(false);
    };

    const handleEndToggleCalendar = () => {
        setIsEndOpen(!isEndOpen);
        setIsStartOpen(false);
    };
    const handleEndDateChange = (endDate) => {
        setEndDate(endDate);
        setNowEndDate(moment(endDate).format("YYYY-MM-DD"));
        setIsEndOpen(false);
    }

    useEffect(()=>{
        onSelectDate(nowStartDate, nowEndDate);
    }, [startDate, endDate]);


    return (
        <div className={styles.dropdown}>
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
            <span>
            <DropdownButton
                id="dropdown-button"
                onClick={handleStartToggleCalendar}
                title={nowStartDate}
                show={isStartOpen}
                variant="outline-secondary"
            >
                <div className={styles.calendar_area}>
                    <Calendar
                        onChange={handleStartDateChange}
                        value={startDate}
                        formatDay={(locale, date) => moment(date).format("DD")}/>
                </div>

            </DropdownButton>
            </span>
            <span className={styles.wave}>
                ~
            </span>
             <span>
            <DropdownButton
                id="dropdown-button"
                onClick={handleEndToggleCalendar}
                title={nowEndDate}
                show={isEndOpen}
                variant="outline-secondary"
            >
                <div className={styles.calendar_area}>
                     <Calendar
                         onChange={handleEndDateChange}
                         value={endDate}
                         formatDay={(locale, date) => moment(date).format("DD")}/>

                </div>

            </DropdownButton>
                 </span>
        </div>


    );
}