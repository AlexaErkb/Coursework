import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Alert, ScrollView, TouchableOpacity, Platform, TextInput} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

const Test = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [colorM, setColorM] = useState(false);
  const [colorF, setColorF] = useState(false);
  const [show, setShow] = useState(false);
  const [pulse, onChangepulse] = useState(null);
  const [min, onChangetime] = useState(null);
  const [border1, setBorder1] = useState(false);
  const [border2, setBorder2] = useState(false);
  const [play, setPlay] = useState(false);
  const [num, setNum] = useState(0)
  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  const [time, setTime] = useState(0)
  const [sex, setSex] = useState(0)
  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const onClickBtnF = color => {
    setColorF(colorF => !colorF)
    setColorM(false)
  }

  const onClickBtnM = color => {
    setColorM(colorM => !colorM)
    setColorF(false)
  }

  const onChangePulse = (pulse) => {
    onChangepulse(pulse)
    if (pulse==null) {
      setBorder1(false);
    } else if (pulse.length == 0) {
      setBorder1(false);
    } else {
      setBorder1(true);
    }
  }

  const onChangeTime = (min) => {
    onChangetime(min)
    if (min==null) {
      setBorder2(false);
    } else if (min.length == 0) {
      setBorder2(false);
    } else {
      setBorder2(true);
    }
  }

  const setTimer = (time) => {
    setNum(time)
    setPlay(true)
  }

  const getSex = () => {
    if (colorF==true) { return 2; } else { return 1; }
  }

  const toResult = async () => {
        try {
        const full = 'day='+date.getDate()+'&month='+(date.getMonth()+1)+'&year='+date.getFullYear()+'&sex='+getSex()+'&m1='+pulse+'&m2='+min
        console.log(full)
        await fetch(
          "http://abashin.ru/cgi-bin/ru/tests/heart", {
            method: "POST",
            headers: {
            "Host": "abashin.ru",
            "Connection": "close",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control": "max-age=0",
            },
            body: full
          })
              .then(response => {
                response.text()
              .then(res => {
                navigation.navigate('Результат', {params: res})
            });
          })  
        }
        catch (error) {
        console.error(error);
        }
      }

  const check = () => {
    if ( (colorF==false && colorM==false) || (pulse==0) || (min==0) ) {
      Alert.alert('Вы ввели не все данные')
    } else {
      toResult()
    }
  }

  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Введите вашу дату рождения:</Text>
        <Feather name="calendar" size={24} color="black" style={{marginTop:'4%', marginLeft: '3%'}}/>
        <View style={{marginTop: '-7%', marginRight: '61%'}}>
        <DateTimePicker
          value={date}
          mode={mode}
          maximumDate={new Date()}
          display="default"
          onChange={onChange}
        />
        </View>
        <Text style={styles.text}>Выберите свой пол:</Text>
        <View style={{flexDirection: 'row'}}>
        <IconButton
          style={{marginTop: '-2%'}}
          icon="gender-female"
          color={colorF ?  'hotpink' : 'black'}
          size={50}
          onPress={() => onClickBtnF()}
        />
        <IconButton
          style={{marginTop: '-2%'}}
          icon="gender-male"
          color={colorM ? '#42aaff' : 'black'}
          size={50}
          onPress={() => onClickBtnM()}
        />
        </View>
      <Text style={styles.points}>1. Вы должны сидеть спокойно 5 минут.</Text>
      <Text style={styles.points}>2. Измерьте пульс в спокойствии.</Text>
      <Text style={styles.points}>3. Введите ваш пульс до приседаний:</Text>
      <TextInput
        style={styles.input}
        borderColor={border1 ? 'green' : 'red'}
        onChangeText={onChangePulse}
        value={pulse}
        placeholder="Введите пульс"
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <Text style={styles.points}>4. Выполните 20 приседаний, вытягивая руки перед собой в среднем темпе (1-1,5 секунды на одно приседание).</Text>
      <Text style={styles.points}>5. Сидите спокойно 2 минуты</Text>
      <Text style={styles.points}>6. Считайте пульс в течение следующих 3,4,5,6 минут. Введите в программу количество минут, через сколько пульс стал равным пульсу до приседаний.</Text>
      <Text style={styles.points}>7. Введите количество минут</Text>
      <TextInput
        style={styles.input}
        borderColor={border2 ? 'green' : 'red'}
        onChangeText={onChangeTime}
        value={min}
        placeholder="Введите количество минут"
        keyboardType="number-pad"
        returnKeyType="done"
      />
      <Text style={styles.points}>8. Нажмите 'Закончить'. Поздравляем, тест завершен!</Text>
      <View style={styles.sectionStyle}>
          <Stopwatch
            style={{borderRadius: '30px'}}
            laps
            start={isStopwatchStart}
            reset={resetStopwatch}
            options={options}
            getTime={(time) => {
              setTime(time);
            }}
          />
          <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {
              setIsStopwatchStart(!isStopwatchStart);
              setResetStopwatch(false);
            }}>
            <View style={styles.button}>
              <Text style={{ color: 'white', padding:10, fontSize: 20 }}>{!isStopwatchStart ? 'START' : 'STOP'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
            <View style={styles.button}>
              <Text style={{ color: 'white', padding:10, fontSize: 20 }}>RESET</Text>
            </View>
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => {check()}}>
            <View style={styles.submit}>
              <Text style={{ color: 'white', padding:10, fontSize: 20 }}>Завершить</Text>
            </View>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  text: {
    marginTop: '5%',
    marginStart: '3%',
    fontFamily: 'Verdana',
    fontSize: 18,
    fontWeight: '450',
  },
  points: {
    marginRight: '2%',
    marginTop: '2%',
    marginStart: '3%',
    fontFamily: 'Verdana',
    fontSize: 18,
    fontWeight: '450',
  },
  input: {
    fontSize: 15,
    borderRadius: '5px',
    height: 40,
    marginTop: '2%',
    marginStart: '3%',
    marginEnd: '3%',
    borderWidth: 1.5,
    padding: '3%',
  },
  sectionStyle: {
    flex: 1,
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: '3%',
    margin: '3%',
    backgroundColor: '#d37470',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 30
  },
  submit: {
    marginHorizontal: '20%',
    paddingHorizontal: '3%',
    margin: '3%',
    backgroundColor: '#000',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 30
  }
});

const options = {
  container: {
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    padding: 5,
    width: 200,
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
    marginLeft: 7,
  },
};

export default Test;
