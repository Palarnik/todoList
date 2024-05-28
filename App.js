import 'react-native-gesture-handler';

import React, {startTransition, useState} from 'react';
import Home from './components/Home'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { Alert, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Stack = createStackNavigator();

export default function App() {
  const navigation = useNavigationContainerRef();

  return (
    <NavigationContainer ref={navigation}>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: 'screen',
        headerStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={()=>({
          title: '',
          headerRight: ()=> (
            <FontAwesome.Button name="lock"
            onPress={() => Alert.alert(
              'Czy chcesz włączyć szyfrowanie?',
              'Gdy szyfrowanie zostanie włączone każdorazowo wymagane będzie logowanie PIN-em, lub za pomocą Biometrii',
              [
                {text: 'Anuluj', onPress: () => console.log('Cancel Pressed!')},
                {text: 'Włącz', onPress: ()=> navigation.navigate("Test")},
              ],
              { cancelable: false }
            )}
            title="Info"
            color = '#55BCF6'
            backgroundColor='transparent'
          />
          ),
        })}
      />
      <Stack.Screen
      name="Test"
      component={Home}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

