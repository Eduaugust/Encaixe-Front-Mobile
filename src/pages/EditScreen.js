import React from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'
import { Alert } from 'react-native'

const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const EditScreen = (props) => {
    const userProps = props.route.params.item
    const putClient = async (submitSet) => {
        const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${userProps.id}`, {
        method: 'PUT',
        body: JSON.stringify(submitSet),
        headers: {'Content-Type': 'application/json'}
      })
      const json = await req.json();
      if(json.type === 'Error'){
        Alert.alert('Erro', json.message)
      } else{
        
        Alert.alert('Concluído!', 'Cliente editada com sucesso!', 
        [ {text: "Ok", onPress: () => {props.navigation.goBack()} } ]);
        
      }
    }
    return (
    <BackGroundView>
        <InsertForms postClient={(data)=>{putClient(data)}} name={userProps.name} number={userProps.number} service={userProps.service} morning={userProps.morning} afternoon={userProps.afternoon} tuesday={userProps.tuesday} wednesday={userProps.wednesday} thursday={userProps.thursday} friday={userProps.friday} saturday={userProps.saturday} start={new Date(userProps.start)} end={new Date(userProps.end)}/>
    </BackGroundView>
)}

export default EditScreen