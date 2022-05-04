import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'
import Info from './Info'
import Test from './Test'
import Result from './Result'

const AppStack = createStackNavigator();

const Navigate = (props) => {

  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Главная" component={Home}/>
      <AppStack.Screen name="Информация" component={Info}/>
      <AppStack.Screen name="Тест" component={Test}/>
      <AppStack.Screen name="Результат" component={Result}/>
    </AppStack.Navigator>
  );
};

export default Navigate;