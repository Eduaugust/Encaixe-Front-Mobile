import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, FlatList, TextInput} from 'react-native'
import ItemList from '../components/itemList'



const EditScreen = () => {

    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        getData()
    }
        , [])

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


    return (
    <SafeAreaView style={{flex: 1}}>
        <View >
            <TextInput 
            placeholder="Pesquisar por número"
            style={{}}  
            value={search}   
            onChangeText={(t)=>searchFilter(t)}       
            underlineColorAndroid='transparent'
            />
            <FlatList 
                data={filterData}
                keyExtractor={item=>item.id}
                renderItem={({item})=><ItemList data={item} refresh={()=>getData()} />}

            />

        </View>

        
    </SafeAreaView>
)}

export default EditScreen