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
    margin:5px;
`;

const ItemList = ({data, icon, funcWhoCalled, deleteClient}) => {    
    return (
        <Item  onPress={()=>{}}>
            <ItemText>{data.name}</ItemText>
            <ItemText>{data.number.slice(7)}</ItemText>
            <ItemText>{data.service}</ItemText>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                {data.morning &&
                <ItemText>Manhã</ItemText>}
                {data.afternoon &&
                <ItemText>Tarde</ItemText>}
            </View>

            <>
            <Icon  name={`ios-${icon}`}  color='white' size={18} backgroundColor='transparent' onPress={()=>{funcWhoCalled(data);}} />
            <Icon.Button  name="trash"  color='white' size={18} backgroundColor='transparent' onPress={()=>{deleteClient(data)}} />
            </>
        </Item>

    )
}

export default ItemList