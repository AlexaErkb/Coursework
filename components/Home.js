import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Функциональная проба человека (Проба Мартине)</Text>
      <TouchableOpacity onPress={() => {navigation.navigate("Информация")}}>
        <View style={styles.button}>
          <Text style={{ color: 'white', padding:8, fontSize: 20 }}>Начать</Text>
        </View>
      </TouchableOpacity>
      <Image source={require('../images/martine.jpg')} style={{width: '140%'}}/>
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
    margin: '3%',
    marginHorizontal: '30%',
    backgroundColor: '#70c1d4',
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 30
  },
  text: {
    marginHorizontal: '15%',
    fontFamily: 'Verdana',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '450',
  },
});

export default Home;