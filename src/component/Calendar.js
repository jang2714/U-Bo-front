import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from "moment";

export default function CustomCalendar() {
    const [nowDate, setNowDate] = useState("날짜");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleToggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate);
        setNowDate(moment(selectedDate).format("YYYY년 MM월 DD일"));
        setIsOpen(false);
    };

    return (
        <>
            <DropdownButton
                onClick={handleToggleCalendar}
                title={nowDate}
                show={isOpen}
            >
                <Calendar onChange={handleDateChange} value={selectedDate}></Calendar>
            </DropdownButton>
        </>
    );
}
