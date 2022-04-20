import React, { useState } from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'
import AwesomeAlert from 'react-native-awesome-alerts';
import { Text, View, ActivityIndicator } from 'react-native'

const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const EditScreen = (props) => {

  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [loading, setLoading] = useState(false)  

  const userProps = props.route.params.item
    const putClient = async (submitSet) => {
      setLoading(true);
      const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${userProps.id}`, {
        method: 'PUT',
        body: JSON.stringify(submitSet),
        headers: {'Content-Type': 'application/json'}
      })
      const json = await req.json();
      if(json.type === 'Error'){
        setAlertTitle('Erro')
        setAlertMessage(json.message)
      } else{
        setAlertTitle('Concluído!')
        setAlertMessage('Cliente editada com sucesso!')
      }
      setLoading(false);
      setShowAlert(true)
    }

    return (
      <>
      {loading && 
        <View style={{zIndex:3, elevation:3,alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'#CCC', width:'100%', height:'100%'}}>
          <ActivityIndicator size="large" color='black'/>
          <Text style={{color: 'black', fontSize:18}}>Adicionando</Text>
        </View>
      }
      {showAlert &&
        <AwesomeAlert
            show={showAlert}
            title={alertTitle}
            message={alertMessage}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            cancelText="Cancelar"
            confirmText="Confirmar"
            confirmButtonColor="#DD6B55"

            onConfirmPressed={() => {
              setShowAlert(false); 
              props.navigation.goBack()
            }}
          />}
    {!loading && !showAlert &&
    <BackGroundView>
        <InsertForms postClient={(data)=>{putClient(data)}} name={userProps.name} number={userProps.number} service={userProps.service} morning={userProps.morning} afternoon={userProps.afternoon} tuesday={userProps.tuesday} wednesday={userProps.wednesday} thursday={userProps.thursday} friday={userProps.friday} saturday={userProps.saturday} start={new Date(userProps.start)} end={new Date(userProps.end)}/>
    </BackGroundView>
    }
    </>
)}

export default EditScreen