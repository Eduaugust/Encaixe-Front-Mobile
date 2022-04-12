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
        return week + "  //  " + day + "/" + month +  "/" + year;
    }

    const formatDateToDb = (date) => {
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "/" + month + "/" + day;
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

export default datePicker
