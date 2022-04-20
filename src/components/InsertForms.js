import React, {useState} from 'react'
import {View, Text, TextInput, StyleSheet, Button, Alert} from 'react-native'
import DatePicker from './datePicker'
import CheckBox from './checkbox';
import Icon from 'react-native-vector-icons/Ionicons';



const InsertForms = (props) => {
    const RegExp = /\+\d{2}\s\(\d{2}\)\s\d{4,5}-?\d{4}/g;

    function mTel(tel) {
      tel=tel.slice(0, 17)
      tel=tel.replace(/\D/g,"")
      tel=tel.replace(/^(\d)/,"+$1")
      tel=tel.replace(/(.{3})(\d)/,"$1($2")
      tel=tel.replace(/(.{6})(\d)/,"$1)$2")
      if(tel.length == 12) {
          tel=tel.replace(/(.{1})$/,"-$1")
      } else if (tel.length == 13) {
          tel=tel.replace(/(.{2})$/,"-$1")
      } else if (tel.length == 14) {
          tel=tel.replace(/(.{3})$/,"-$1")
      } else if (tel.length == 15) {
          tel=tel.replace(/(.{4})$/,"-$1")
      } else if (tel.length > 15) {
          tel=tel.replace(/(.{4})$/,"-$1")
      }
      return tel;
  }
  
  const clearForm = () => {
    setName('')
    setNumber('')
    setService('')
    setMorning(true)
    setAfternoon(true)
    setTuesday(true)
    setWednesday(true)
    setThursday(true)
    setFriday(true)
    setSaturday(true)
  }
    
    const [name, setName] = useState(props.name)
    const [number, setNumber] = useState(props.number)
    const [service, setService] = useState(props.service)
    const [start, setStart] = useState(props.start)
    const [end, setEnd] = useState(props.end)
    const [morning, setMorning] = useState(props.morning)
    const [afternoon, setAfternoon] = useState(props.afternoon)
    const [tuesday, setTuesday] = useState(props.tuesday)
    const [wednesday, setWednesday] = useState(props.wednesday)
    const [thursday, setThursday] = useState(props.thursday)
    const [friday, setFriday] = useState(props.friday)
    const [saturday, setSaturday] = useState(props.saturday)


  

	const handleSubmit = async () => {
    try {
      if (name.trim() === ''){
        throw new Error('Insira um nome')
      }
      if (number.length > 17 || number.length < 16){
        throw new Error('Copie e cole o número do whatsapp \nEx: +55(13)99334-0029  \nAceito somente +55')
      }
      if (start > end) {
        throw new Error('Data inicial deve ser menor que a final')
      }

      const submitSet = {
        name, number, service, start, end, morning, afternoon, tuesday, wednesday, thursday, friday, saturday, 'userId': 1
      }

      await props.postClient(submitSet)
      clearForm();

    } catch (e) {
      Alert.alert('Erro', e.message)
    }
  }

    return (
        // FORMULÁRIO
        <View style={styles.container}>

          {/* Nome/ número */}
            <View style={styles.containerRow}>
                <TextField label={'Nome'} placeholder={'Digite um nome'} onChangeText={t=>setName(t)} value={name} />
                <TextField label={'Número'} placeholder={'+55(99)99999-9999'} onChangeText={t=>setNumber(mTel(t))} value={number} keyboardType='numeric' />
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
                <SelectDay label={'Ínicio'} name={start} setName={setStart} />
                <SelectDay label={'Fim'} name={end} setName={setEnd} />
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
                <Button onPress={handleSubmit} title={'Enviar'} style={{marginHorizontal: 30}} color='rgba(0,0,0,0.8)' />
                <Icon  name="ios-refresh"  color='black' size={18} backgroundColor='transparent' onPress={clearForm} style={{marginHorizontal: 30}} />
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

  const SelectDay = ({ label, setName, name }) => (
    <View style={styles.containerText}>
      <Text style={styles.label}>{label}</Text>
      <DatePicker
        passDate={(data)=>{setName(data);}}
        style={styles.input}
        value={name}
      />
    </View>
  )

  const ChoiceCheckBox = ({ name, label, setName, style }) => (
    <View style={style}>
      <CheckBox
        value={name}
        onValueChange={(newValue) => setName(newValue)}
      />
      <Text style={{fontSize:16, color:'black'}}>{label}</Text>

    </View>
  )

const styles = StyleSheet.create({
    container: {
        backgroundColor:'pink',
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
        flex:1,
        padding:3,
        backgroundColor:'white',
        borderRadius: 5,
    },
})

Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

export default InsertForms;