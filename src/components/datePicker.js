import React, { useState } from 'react';
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';

const Show = styled.Button`
`;

const datePicker = ({passDate}) => {

    const formatDate = (date) => {
        const weekday = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let week = weekday[dateObj.getDay()];
        return week + " // " + day.pad() + "/" + month.pad() +  "/" + year;
    }

    const formatDateToDb = (date) => {
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "-" + month.pad() + "-" + day.pad();
    }

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
        <>
        <Show title={formatDate(date)} onPress={()=>{setOpen(true);}} />
        {open &&
        <DateTimePicker 
        value={date}
        mode="date"
        is24Hour={true}
        onChange={(event, selectedDate)=>{
            setOpen(false); 
            if(selectedDate != undefined) {
                passDate(formatDateToDb(selectedDate))
                setDate(selectedDate)
            }}}
        />        
        }
        </>
        

        
)}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export default datePicker
