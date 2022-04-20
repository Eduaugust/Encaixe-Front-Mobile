import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';



const Checkbox = ({value, onValueChange}) => {

    return (
    <>
    {value && 
    <Icon onPress={()=>onValueChange(!value)} name='ios-checkbox-sharp' backgroundColor="transparent" color='black' size='16' style={{alignItems: 'center', justifyContent: 'center', margin:5}} />
    }
    {!value && 
    <Icon onPress={()=>onValueChange(!value)} name='ios-square-outline' backgroundColor="transparent" color='black' size='16' style={{alignItems: 'center', justifyContent: 'center', margin:5}} />
    }
    </>
    )
}
const styles = StyleSheet.create({
    CheckView: {
        height:5, 
        width:5,
        border: '1px solid red', 
    },
    CheckView: {},
})

export default Checkbox;