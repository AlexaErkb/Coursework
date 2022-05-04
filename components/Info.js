import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Info = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Функциональная проба человека{"\n"}Проба Мартине</Text>
      <Text style={styles.text}>Чтобы пройти тест, вы должны уметь сидеть в течение 5 минут, выполнить 20 полных приседаний. тест занимает около 10-15 минут.</Text>
      <TouchableOpacity onPress={() => {navigation.navigate("Тест")}}>
        <View style={styles.button}>
          <Text style={{ color: 'white', padding:10, fontSize: 20 }}>Начать</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  button: {
    margin: '5%',
    backgroundColor: '#70c1d4',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 30
  },
  text: {
    margin: '3%',
    marginHorizontal: '5%',
    fontFamily: 'Verdana',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '450',
  },
});

export default Info;