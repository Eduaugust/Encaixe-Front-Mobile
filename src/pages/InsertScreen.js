import React, {useState} from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'
import { Text, View, ActivityIndicator, Alert, Linking } from 'react-native'


const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const InsertScreen = () => {
  const todayDate = formatDateToDb(new Date())

  const [loading, setLoading] = useState(false)

  const postClient = async (submitSet) => {
    setLoading(true);
      const req = await fetch('https://encaixe-back.herokuapp.com/clients', {
      method: 'POST',
      body: JSON.stringify(submitSet),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await req.json();
    if(json.type === 'Error'){
      Alert.alert('Erro', json.message)
    } else{
      Alert.alert('Concluído!', 'Cliente entrou na fila de encaixe');
    }
    setLoading(false);
  }
  return (
      <>
      {loading && 
        <View style={{zIndex:3, elevation:3,alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'#CCC', width:'100%', height:'100%'}}>
          <ActivityIndicator size="large" color='black'/>
          <Text style={{color: 'black', fontSize:18}}>Adicionando</Text>
        </View>
      }
      {!loading && 
    <BackGroundView>
        <InsertForms postClient={postClient} name="" number='' morning={true} afternoon={true} tuesday={true} wednesday={true} thursday={true} friday={true} saturday={true} start={todayDate} end={todayDate}/>
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