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

const ItemList = ({data, refresh, icon, funcWhoCalled}) => {

    const DeleteClient = () => {
        const del = async (id) => {
            const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${id}` , {method: 'DELETE'})
            const json = await req.json()
            if(json.type === 'Error'){
                Alert.alert('Erro', 'Algum erro ocorreu ao deletar a cliente')
            } else{
                Alert.alert('Success', 'Cliente deletado com sucesso')
                refresh()
            }
        }
        Alert.alert(
            "Aviso",
            "Exluir permanentemente a cliente:\nNome: " + data.name + '\nNum: ' + data.number,
            [
              {text: "Cancelar",style: "default"},
              { text: "Exluir", onPress: async () => await del(data.id), style: "destructive" }
            ]
          );
    }

    
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
            <Icon.Button  name={`ios-${icon}`}  color='white' size={18} backgroundColor='transparent' onPress={()=>{funcWhoCalled(data)}} />
            <Icon.Button  name="trash"  color='white' size={18} backgroundColor='transparent' onPress={()=>{DeleteClient()}} />
            </>
        </Item>

    )
}

export default ItemList