import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import DatePicker from './datePicker'

const InsertForms = () => {
    
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [service, setService] = useState('')
    const [period, setPeriod] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [dayWeek, setDayWeek] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

	const handleSubmit = () => {
        alert('enviado')
    }

    return (
        // FORMULÁRIO
        <View style={styles.container}>
            <View style={styles.containerRow}>
                <TextField label={'Nome'} placeholder={'Digite um nome'} onChangeText={t=>setName(t)} value={name} />
                <TextField label={'Número'} placeholder={'DDD + número'} onChangeText={t=>setNumber(t)} value={number} />
            </View>
            <View style={styles.containerRow}>
                <TextField label={'Serviço'} placeholder={'Digite o serviço'} onChangeText={t=>setService(t)} value={service} />
                <TextField label={'Período'} placeholder={'Selecione o período'} onChangeText={t=>setPeriod(t)} value={period} />
            </View>
            <View style={styles.containerRow}>
                <SelectDay label={'Ínicio'} setName={setStart} />
                <SelectDay label={'Fim'} setName={setEnd} />
            </View>
            <View style={styles.containerRow}>
                <TextField label={'Dias da semana'} placeholder={'Selecione os dias da semana'} onChangeText={t=>setDayWeek(t)} value={dayWeek} />
            </View>
            <View style={styles.containerRow}>
                <Button onPress={handleSubmit} title={'Adicionar na lista'} />
            </View>
        </View>
    )
}

const TextField = ({ label, value, ...inputProps }) => (
    <View style={styles.containerText}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
      value={value}
        style={styles.input}
        {...inputProps}
      />
    </View>
  )

  const SelectDay = ({ label, setName }) => (
    <View style={styles.containerText}>
      <Text style={styles.label}>{label}</Text>
      <DatePicker
        passDate={(data)=>{setName(data);} }
        style={styles.input}
      />
    </View>
  )

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
        fontSize:22,
    },
    input:{
        padding:3,
        backgroundColor:'rgba(250,140,130,1)',
        borderRadius: 5,
    },
})

export default InsertForms;