import React from 'react';
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';


const Item = styled.TouchableOpacity`
    flex-direction: row;
    backgroundColor: rgba(250,140,130,0.7);
    border-radius: 5px;
    padding:10px;
    justify-content: space-between;
    alignItems: center;
`;

const ItemText = styled.Text`
    color:white;
    margin:5px;
`;

const ItemList = (props) => {

    const OpenWhats = () => {
        const url = 'whatsapp://send?text=' + 'Oiii, surgiu um horário para o dia '+ t.date  + '&phone=55' + (t.number).toString()
        Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened successfully " + data);  //<---Success
        })
        .catch(() => {
          alert("Make sure WhatsApp installed on your device");  //<---Error
        });
    }

    const t = props.data
    return (
        <Item  onPress={()=>{}}>
            <ItemText>{t.name}</ItemText>
            <ItemText>{t.number}</ItemText>
            <ItemText>{t.period}</ItemText>
            <ItemText>{t.date}</ItemText>
            <>
            <Icon.Button  name="ios-logo-whatsapp"  color='white' size={18} backgroundColor='transparent' onPress={()=>OpenWhats(t.number)} />
            <Icon.Button  name="trash"  color='white' size={18} backgroundColor='transparent' />
            </>
        </Item>

    )
}

export default ItemList