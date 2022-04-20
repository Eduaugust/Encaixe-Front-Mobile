import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';



const Checkbox = ({value, onValueChange}) => {

    return (
    <>
    {value && 
    <Icon onPress={()=>onValueChange(!value)} name='ios-checkbox-sharp' backgroundColor="transparent" color='black' size={22} style={{alignItems: 'center', justifyContent: 'center', margin:5}} />
    }
    {!value && 
    <Icon onPress={()=>onValueChange(!value)} name='ios-square-outline' backgroundColor="transparent" color='black' size={22} style={{alignItems: 'center', justifyContent: 'center', margin:5}} />
    }
    </>
    )
}

export default Checkbox;