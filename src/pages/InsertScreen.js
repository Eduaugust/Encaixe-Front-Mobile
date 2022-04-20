import React, {useState} from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'
import { Text, View, ActivityIndicator } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts';

const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const InsertScreen = () => {
  const todayDate = formatDateToDb(new Date())

  const [loading, setLoading] = useState(false)  
  const [alertMessage, setAlertMessage] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const postClient = async (submitSet) => {
    setLoading(true);
      const req = await fetch('https://encaixe-back.herokuapp.com/clients', {
      method: 'POST',
      body: JSON.stringify(submitSet),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await req.json();
    if(json.type === 'Error'){
      setAlertTitle('Erro')
      setAlertMessage(json.message)
    } else{
      setAlertTitle('Concluído!')
      setAlertMessage('Cliente adicionada a fila de encaixe com sucesso!')
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
            }}
          />}
           
      {!loading && !showAlert &&
    <BackGroundView>
        <InsertForms postClient={async (data)=>{postClient(data)}} name="" service='' number='' morning={true} afternoon={true} tuesday={true} wednesday={true} thursday={true} friday={true} saturday={true} start={todayDate} end={todayDate}/>
    </BackGroundView>}
    </>
)}

const formatDateToDb = (date) => {
  let dateObj = date
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  const returnDate = year + "-" + month.pad() + "-" + day.pad();
  return returnDate
}

export default InsertScreen