import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native'
import ItemList from '../components/itemList'
import DatePicker from '../components/datePicker';
import { Text, View, ActivityIndicator, Linking } from 'react-native'
import { useIsFocused  } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';

const BackGroundView = styled.View`
    zIndex:1;
    elevation:1;
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
    const todayDate = formatDateToDb(new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}))


    const [date, setDate] = useState(todayDate)
    const [data, setData] = useState([]);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [ loading, setLoading ] = useState(true);
    const [idClient, setIdClient] = useState()

    const isFocused = useIsFocused();
    useEffect(() => {
        isFocused ? getData(): 1
        return () => {
              // This is the cleanup function
            }
    }
    , [date, isFocused])

    const getData = async () => {
        setLoading(true)
        const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${date}` , {
            method: 'GET',
        })
        const json = await req.json();
        if(json.type === 'Error'){
            setAlertTitle('Erro')
            setAlertMessage(json.message)
            setShowAlert(true)
            setData([])
        } else{
            setData(json)
        }
        setLoading(false)
    }

    const OpenWhats = (data) => {
        const url = 'whatsapp://send?text=' + 'Oiii, surgiu um horário para o dia '+ data.date  + '&phone=55' + (data.number).toString()
        Linking.openURL(url)
        .then(data => {
          console.log("WhatsApp Opened successfully " + data);
        })
        .catch(() => {
            alert("Make sure WhatsApp installed on your device");
        });
    }

    const del = async () => {
        setLoading(true)
        const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${idClient}` , {method: 'DELETE'})
        const json = await req.json()
        if(json.type === 'Error'){
            setAlertTitle('Error')
            setAlertMessage('Algum erro ocorreu ao deletar a cliente. \n'+json.message)
        } else{
            setAlertTitle('Sucesso')
            setAlertMessage('Cliente deletada com sucesso')
        }
        await getData()
        setLoading(false)
        setShowAlert(true)     
    }

    const DeleteClient = (data) => {
        setAlertTitle('Aviso')
        setAlertMessage("Exluir permanentemente a cliente:\nNome: " + data.name + '\nNum: ' + data.number)
        setIdClient(data.id)
        setShowAlert(true)        
    }

    return (
        <>
    {/* Tela de carregamento */}
    {loading && 
        <View style={{zIndex:333, elevation:333,alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'rgba(250,250,250,0.1)', width:'100%', height:'100%'}}>
            <ActivityIndicator size="large" color='black'/>
            <Text style={{color: 'black', fontSize:18}}>Carregando</Text>
        </View>
    }
    {/* DatePicker e Lista */}
    {!loading && !showAlert && 
    <BackGroundView>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <DatePicker passDate={(newDate)=>{setDate(newDate);}} value={date} />
        </View>
        
        <List
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item})=><ItemList data={item} deleteClient={(data)=>DeleteClient(data)} icon='logo-whatsapp' funcWhoCalled={(data)=>{OpenWhats(data)}} />}
        />
    </BackGroundView>
      }
      {/* Alerta de delete */}
      {!loading && showAlert &&
      <AwesomeAlert
          show={showAlert}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={idClient != 0}
          showConfirmButton={true}
          cancelText="Cancelar"
          confirmText="Confirmar"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setShowAlert(false)
            setIdClient(0)
          }}
          onConfirmPressed={async () => {
              if(idClient != 0){
                await del()
              } 
              setShowAlert(false); 
              setIdClient(0)
          }}
        />}

    </>
)}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
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

export default HomeScreen