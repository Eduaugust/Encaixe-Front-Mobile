import React, { useState } from 'react';
import styled from 'styled-components/native'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';


const Show = styled.Button`
`;

const Modal = styled.Modal`
`

const ViewModal = styled.View`
    flex:1;
    justifyContent: center;
    alignItems: center;
    backgroundColor:rgba(0,0,0,0.1)
    `

const datePicker = ({passDate, value}) => {

    const reverseStr = (str) => {
        const strSplit = str.split("-")
        const strReverse = strSplit.reverse()
        const strR = strReverse.join('/')
        return strR
    }

    const formatDateToDb = (date) => {
        if(typeof date == 'object'){
            let dateObj = date
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();
            return year + "-" + month.pad() + "-" + day.pad();
        } else {
            return date
        }
    }
    typeof value === "object" ? value = formatDateToDb(value): 1
    const [date, setDate] = useState(value);
    const [open, setOpen] = useState(false);

    const obj = {}
    obj[date] = {selected: true}

    return (
        <>
        <Show color={'rgba(0,0,0,0.8)'} title={reverseStr(date)} onPress={()=>{setOpen(true);}} />

        {open &&
        <Modal animationType="slide">
            <ViewModal>
                <Calendar
                markedDates={obj}
                style={{borderRadius:10, marginBottom:10}}
                current={date}
                onDayPress={day => {
                    setDate(day.dateString); passDate(day.dateString); setOpen(false);
                }}

                renderArrow={(direction) => direction === 'left' ? <Icon name='ios-arrow-back'/> : <Icon name='ios-arrow-forward'/> }
                />
                <Show title={'Fechar'} color='rgba(0,0,0,0.8)' onPress={()=>{setOpen(false);}} />
            </ViewModal>
        </Modal>
        }
        
        </>        
)}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    today: "Hoje"
  };
  LocaleConfig.defaultLocale = 'br';

export default datePicker
