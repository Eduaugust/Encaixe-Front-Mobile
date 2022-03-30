import React, { useState } from 'react';
import styled from 'styled-components/native'
import DateTimePicker from '@react-native-community/datetimepicker';
import ItemList from '../components/itemList'
import data from '../json/SearchList'

const BackGroundView = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: flex-start;
    padding: 10px;
`;

const Show = styled.Button`
`;

const List = styled.FlatList`
    flex: 1;
    height:100px;
    width:100%
    margin:10px
`;

const HomeScreen = () => {

    const formatDate = (date) => {
        const weekday = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        let week = weekday[dateObj.getDay()];
        return week + "   " + day + "/" + month +  "/" + year;
    }

    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    return (
    <BackGroundView>
        <Show title={formatDate(date)} onPress={()=>{setOpen(true);}} />
        <List
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item})=><ItemList data={item} />}
        />
        {open &&
        <DateTimePicker 
        value={date}
        mode="date"
        is24Hour={true}
        onChange={(event, selectedDate)=>{setOpen(false); selectedDate == undefined? 1 : setDate(selectedDate)}}
        />        
        }
        

        
    </BackGroundView>
)}

export default HomeScreen