import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, TextInput, StyleSheet, ActivityIndicator, Text, Alert} from 'react-native'
import ItemList from '../components/itemList'
import { useIsFocused  } from '@react-navigation/native';


const ShowAllScreen = ({ navigation }) => {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        isFocused ? getData(): null
    }
        , [isFocused])

    const getData = async () => {
        setLoading(true)
        const url = `https://encaixe-back.herokuapp.com/clients/`
        const req = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const json = await req.json();
        if(json.type === 'Error'){
            Alert.alert('Erro', json.message)
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

    const DeleteClient = (data) => {
        const del = async (id) => {
            setLoading(true)
            const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${id}` , {method: 'DELETE'})
            const json = await req.json()
            if(json.type === 'Error'){
                Alert.alert('Erro', 'Algum erro ocorreu ao deletar a cliente')
            } else{
                Alert.alert('Success', 'Cliente deletado com sucesso')
            }
            getData()
            setLoading(false)
        }
        Alert.alert(
            "Aviso",
            "Exluir permanentemente a cliente:\nNome: " + data.name + '\nNum: ' + data.number,
            [
              {text: "Cancelar",style: "default" },
              { text: "Exluir", onPress: async () => {await del(data.id)}, style: "destructive" }
            ]
          );
    }



    return (
    <SafeAreaView style={{flex: 1}}>
      {loading && 
        <View style={{zIndex:3, elevation:3,alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'#CCC', width:'100%', height:'100%'}}>
          <ActivityIndicator size="large" color='black'/>
          <Text style={{color: 'black', fontSize:18}}>Carregando</Text>
        </View>
      }
    {!loading && 
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
        height:100,
        width:'80%',
        margin:10,
    }
})

export default ShowAllScreen