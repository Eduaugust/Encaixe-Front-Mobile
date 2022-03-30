import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import { useForm } from 'react-hook-form'

const TextField = ({ label, ...inputProps }) => (
    <View style={styles.containerText}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        {...inputProps}
      />
    </View>
  )

const InsertForms = () => {
    const { register, setValue, handleSubmit } = useForm()
    return (
        <View style={styles.container}>
            <View style={styles.containerRow}>
                <TextField label='Nome' placeholder='Digite um nome' />
                <TextField label='Número' placeholder='DDD + número' />
            </View>
            <View style={styles.containerRow}>
                <TextField label='Serviço' placeholder='Digite o serviço' />
                <TextField label='Período' placeholder='Selecione o período' />
            </View>
            <View style={styles.containerRow}>
                <TextField label='Nome' placeholder='Digite um nome' />
                <TextField label='Número' placeholder='DDD + número' />
            </View>
            <View style={styles.containerRow}>
                <TextField label='Serviço' placeholder='Digite o serviço' />
                <TextField label='Período' placeholder='Selecione o período' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgba(250,140,130,0.5)',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:5,
        marginHorizontal:5,
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    containerText: {
        flex:1,
        padding: 5,
    },
    label:{
        color:"white",
        fontSize:24,
    },
    input:{
        padding:3,
        backgroundColor:'rgba(250,140,130,1)',
        borderRadius: 5,
    },
})

export default InsertForms;