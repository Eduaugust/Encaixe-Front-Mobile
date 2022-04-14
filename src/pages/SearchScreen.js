import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native'
import ItemList from '../components/itemList'
import DatePicker from '../components/datePicker';
import { Text, View, ActivityIndicator, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const BackGroundView = styled.View`
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
    const todayDate = formatDateToDb(new Date())

    const [date, setDate] = useState(todayDate);

    const [data, setData] = useState([]);
    const [ loading, setLoading ] = useState(true);


    useEffect(() => {
        getData()
    }
        , [date])

    const getData = async () => {
        setLoading(true)
        const req = await fetch(`https://encaixe-back.herokuapp.com/clients/${date}` , {
            method: 'GET',
        })
        const json = await req.json();
        if(json.type === 'Error'){
            Alert.alert('Erro', json.message)
            setData([])
        } else{
            setData(json)
        }
        setLoading(false)
    }

    
    
    return (
    <BackGroundView>
        <View style={{flexDirection: 'row'}}>
            <DatePicker passDate={(d)=>{setDate(d)} } />
            <Icon.Button  name="ios-refresh"  color='pink' size={18} backgroundColor='transparent' onPress={()=>{getData()}} />
        </View>
        {loading && 
        <View style={{alignItems: 'center', flex:1, justifyContent: 'center', backgroundColor:'transparent', width:'100%', paddingBottom:80}}>
          <ActivityIndicator size="large" color='black'/>
          <Text style={{color: 'black', fontSize:18}}>Carregando</Text>
        </View>
      }
      {!loading && 
        <List
        data={data}
        keyExtractor={item=>item.id}
        renderItem={({item})=><ItemList data={item} refresh={()=>getData()} />}
        />
      }
        

        
    </BackGroundView>
)}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

function formatDateToDb(date) {
    let dateObj = date
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    return year + "-" + month.pad() + "-" + day.pad();
}

export default HomeScreen