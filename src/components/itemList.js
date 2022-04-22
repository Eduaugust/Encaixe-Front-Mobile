import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert, View } from 'react-native';


const Item = styled.TouchableOpacity`
    flex-direction: row;
    backgroundColor: pink;
    border-radius: 5px;
    padding:5px;
    justify-content: space-between;
    alignItems: center;
    marginVertical:5px;
`;

const ItemText = styled.Text`
    color:white;
`;

const ItemList = ({data, icon, funcWhoCalled, deleteClient}) => {  
    const todayDate = formatDateToDb(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}))  
    console.log(data.end.replaceAll('/','-'), todayDate )
    return (
        <Item  onPress={()=>{}}>
            <ItemText>{data.name}</ItemText>
            <ItemText>{data.number.slice(3)}</ItemText>
            <ItemText>{data.service}</ItemText>
            {data.end.replaceAll('/','-') < todayDate  &&
            <ItemText style={{color: 'red'}}>ENCAIXE VENCIDO</ItemText>            
            }
            {data.end.replaceAll('/','-') > todayDate &&
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                {data.morning &&
                <ItemText>Manhã</ItemText>}
                {data.afternoon &&
                <ItemText>Tarde</ItemText>}
            </View>          
            }
            

            <>
            <Icon  name={`ios-${icon}`}  color='white' size={18} backgroundColor='transparent' onPress={()=>{funcWhoCalled(data);}} />
            <Icon.Button  name="trash"  color='white' size={18} backgroundColor='transparent' onPress={()=>{deleteClient(data)}} />
            </>
        </Item>

    )
}

const formatDateToDb = (date) => {
    if(typeof date == 'object'){
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "-" + month.pad() + "-" + day.pad();
    } else {
        let dateObj = new Date(date)
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "-" + month.pad() + "-" + day.pad();
    }
}

export default ItemList