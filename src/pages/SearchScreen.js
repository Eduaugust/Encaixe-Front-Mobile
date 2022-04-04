import React, {useState} from 'react';
import styled from 'styled-components/native'
import ItemList from '../components/itemList'
import data from '../json/SearchList'
import DatePicker from '../components/datePicker';

const BackGroundView = styled.View`
    flex: 1;
    alignItems: center;
    justifyContent: flex-start;
    padding: 10px;
`;

const List = styled.FlatList`
    flex: 1;
    height:100px;
    width:100%
    margin:10px
`;

const HomeScreen = () => {
    const [date, setDate] = useState();
    
    return (
    <BackGroundView>
        <DatePicker passDate={(data)=>{setDate(data)} } />
        <List
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item})=><ItemList data={item} />}
        />
        

        
    </BackGroundView>
)}

export default HomeScreen