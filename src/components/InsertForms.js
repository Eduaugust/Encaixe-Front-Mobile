import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button} from 'react-native'
import DatePicker from './datePicker'
import CheckBox from '@react-native-community/checkbox';

const InsertForms = () => {
    const todayDate = new Date()
    
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [service, setService] = useState('')
    const [start, setStart] = useState(todayDate.toISOString())
    const [end, setEnd] = useState(todayDate.toISOString())
    const [morning, setMorning] = useState(true)
    const [afternoon, setAfternoon] = useState(true)
    const [tuesday, setTuesday] = useState(true)
    const [wednesday, setWednesday] = useState(true)
    const [thursday, setThursday] = useState(true)
    const [friday, setFriday] = useState(true)
    const [saturday, setSaturday] = useState(true)


  

	const handleSubmit = () => {
    try {
      if (name.trim() === ''){
        throw new Error('Insira um nome')
      }
      if (number.length != 17){
        throw new Error('Copie e cole o número do whatsapp \nEx: +55 13 99334-0029')
      }
      if (start > end) {
        throw new Error('Data inicial deve ser menor que a final')
      }

      const submitSet = {
        name, number, service, start, end, morning, afternoon, tuesday, wednesday, thursday, friday, saturday
      }
      console.log(submitSet)
      alert('Enviado! \nArruma a data')
    } catch (e) {
      alert(e.message)
    }
  }

    return (
        // FORMULÁRIO
        <View style={styles.container}>

          {/* Nome/ número */}
            <View style={styles.containerRow}>
                <TextField label={'Nome'} placeholder={'Digite um nome'} onChangeText={t=>setName(t)} value={name} />
                <TextField label={'Número'} placeholder={'DDD + número'} onChangeText={t=>setNumber(t)} value={number} />
            </View>

            {/* Serviço / Período */}
            <View style={styles.containerRow}>
                <TextField label={'Serviço'} placeholder={'Digite o serviço'} onChangeText={t=>setService(t)} value={service} />
                
                <View style={styles.containerText}>
                  <Text style={styles.label}>{'Período'}</Text>

                  <ChoiceCheckBox label={'Manhã'} name={morning} setName={setMorning} style={styles.containerRow} />
                  <ChoiceCheckBox label={'Tarde'} name={afternoon} setName={setAfternoon} style={styles.containerRow} />

                </View>
                
            </View>

            {/* Data - Início / Fim */}
            <View style={styles.containerRow}>
                <SelectDay label={'Ínicio'} setName={setStart} is_start={true} />
                <SelectDay label={'Fim'} setName={setEnd} is_start={false} />
            </View>

            {/* Dias da semana */}
            <View style={styles.containerCol}>
                  <Text style={styles.label}>{'Dias da Semana'}</Text>
                  <View style={styles.containerRow}>
                    <ChoiceCheckBox label={'Terça-Feira'} name={tuesday} setName={setTuesday} style={styles.containerRow} />
                    <ChoiceCheckBox label={'Quarta-Feira'} name={wednesday} setName={setWednesday} style={styles.containerRow} />
                    <ChoiceCheckBox label={'Quinta-Feira'} name={thursday} setName={setThursday} style={styles.containerRow} />
                  </View>

                  <View style={styles.containerRow}>
                    <ChoiceCheckBox label={'Sexta-Feira'} name={friday} setName={setFriday} style={styles.containerRow} />
                    <ChoiceCheckBox label={'Sábado'} name={saturday} setName={setSaturday} style={styles.containerRow} />
                  </View>
            </View>

            {/* Enviar */}
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

  const SelectDay = ({ label, setName, is_start }) => (
    <View style={styles.containerText}>
      <Text style={styles.label}>{label}</Text>
      <DatePicker
        passDate={(data)=>{
          if(is_start){
            data.toDate().setHours(0); data.setMinutes(0); data.setSeconds(0) 
          } else {
            data.toDate().setHours(23); data.setMinutes(59); data.setSeconds(59) 
          }
          setName(data);
        } }
        style={styles.input}
      />
    </View>
  )

  const ChoiceCheckBox = ({ name, label, setName, style }) => (
    <View style={style}>
      <CheckBox
        disabled={false}
        value={name}
        onValueChange={(newValue) => setName(newValue)}
      />
      <Text style={{fontSize:16, color:'black'}}>{label}</Text>

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
        alignItems: 'center',
    },
    containerCol: {
      flexDirection: 'column',
      alignItems: 'center',
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