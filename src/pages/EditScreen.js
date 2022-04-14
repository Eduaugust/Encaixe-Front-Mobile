import React from 'react';
import styled from 'styled-components/native'
import InsertForms from '../components/InsertForms'
import { Alert } from 'react-native'

const BackGroundView = styled.View`
    flex: 1;
    justifyContent: center;
    alignItems: center;
`;

const EditScreen = () => {

    const todayDate = formatDateToDb(new Date())

    function formatDateToDb(date) {
        let dateObj = date
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();
        return year + "-" + month.pad() + "-" + day.pad();
      }


    const postClient = async (submitSet) => {
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
    }
    return (
    <BackGroundView>
        <InsertForms postClient={postClient} name="" number='' morning={true} afternoon={true} tuesday={true} wednesday={true} thursday={true} friday={true} saturday={true} start={todayDate} end={todayDate}/>
    </BackGroundView>
)}

export default EditScreen