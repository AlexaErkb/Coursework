import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Number } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import '../images/error.jpg'
import '../images/catGood.jpg'
import '../images/krutoy.jpg'
import '../images/meow.jpg'

const Result = ({ route, navigation }) => {
  const { params } = route.params;
  var img = 'error'
  var text = null;
  var back = '#f8f8f8'

  if (params.split('>')[2].includes('E')==true) {
    text = 'Ошибочные данные';
  } else {
    text = params.split('>')[4].split('<')[0].split('. ');
    text = text[0] + '. ' + text[1]
  }

  if (text.includes('Пло')) {
    img = 'meow';
  } else if (text.includes('Сре')) {
    img = 'catGood';
  } else if (text.includes('Хор')) {
    img = 'krutoy';
  }
  const image = require('../images/'+img+'.jpg')
  return (
    <ScrollView style={styles.container, {backgroundColor: back}}>
    <View>
    <Text style={styles.title}>Результаты теста</Text>
    <Text style={styles.text}>Тест не заменяет медицинского обследования! Не забывайте о регулярном профессиональном медицинском осмотре!</Text>
    <Text style={styles.info}>{text}</Text>
    <Image source={image} style={{width: '70%', resizeMode:'contain', alignSelf: 'center'}}/>
    </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: '100%'
  },
  text: {
    alignSelf: 'center',
    marginTop: '5%',
    marginStart: '3%',
    fontFamily: 'Verdana',
    fontSize: 19,
    fontWeight: '450',
  },
  title: {
    alignSelf: 'center',
    marginTop: '10%',
    marginStart: '3%',
    fontFamily: 'Verdana',
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    alignSelf: 'center',
    marginTop: '10%',
    marginStart: '3%',
    fontFamily: 'Verdana',
    fontSize: 19,
    fontWeight: '450',
  },
});

export default Result;