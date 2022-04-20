import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, TextInput, StyleSheet, ActivityIndicator, Text, Alert} from 'react-native'
import ItemList from '../components/itemList'
import { useIsFocused  } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';


const ShowAllScreen = ({ navigation }) => {

    const [search, setSearch] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const [ loading, setLoading ] = useState(true);
    const [idClient, setIdClient] = useState()
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused ? getData(): null
    }
        , [isFocused])

        const getData = async () => {
            setLoading(true)
            const req = await fetch(`https://encaixe-back.herokuapp.com/clients/` , {
                method: 'GET',
            })
            const json = await req.json();
            if(json.type === 'Error'){
                setAlertTitle('Erro')
                setAlertMessage(json.message)
                setShowAlert(true)
                setData([])
                setFilterData([])
            } else{
                setData(json)
                setFilterData(json)
            }
            setLoading(false)
        }

    const searchFilter = (text) => {
        if (text){
            const newData = data.filter((item)=>{
                const itemData = item.number ? item.number.toUpperCase() : ''.toLocaleUpperCase()
                return itemData.indexOf(text) > -1;
            })
            setFilterData(newData)
            setSearch(text)
        } else {
            setFilterData(data)
            setSearch(text)
        }
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
    <SafeAreaView style={{flex: 1}}>
      {/* Tela de carregamento */}
    {loading && 
        <View style={{zIndex:333, elevation:333,alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'rgba(250,250,250,0.1)', width:'100%', height:'100%'}}>
            <ActivityIndicator size="large" color='black'/>
            <Text style={{color: 'black', fontSize:18}}>Carregando</Text>
        </View>
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
    {!loading && !showAlert && 
    <>
            <TextInput 
            placeholder="Pesquisar por número"
            style={styles.searchBar}  
            value={search}   
            onChangeText={(t)=>searchFilter(t)}       
            underlineColorAndroid='transparent'
            keyboardType='phone-pad'
            />
        <View style={{zIndex:1, elevation:1, flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 10}}>
            <FlatList 
                style={styles.list}
                data={filterData}
                keyExtractor={item=>item.id}
                renderItem={({item})=><ItemList data={item} deleteClient={(data)=>{DeleteClient(data)}} icon='pencil' funcWhoCalled={()=>navigation.navigate('Edit', {item})} />}

            />

        </View>
        </>
    }
    </SafeAreaView>
)}

const styles = StyleSheet.create({
    searchBar: {
        height: 40,
        padding: 10,
        margin: 5,
        backgroundColor: '#DDD',
        borderRadius: 5
    },
    list: {
        flex: 1,
        height:'100%',
        width:'100%',
        margin:10,
    }
})

export default ShowAllScreen