import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import * as LocalAuthentication from 'expo-local-authentication';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

export default function App() {

  const [unlocked, setUnlocked] = useState(false);

  useEffect(()=> {
    if (!unlocked) {
      authenticate();
    }
  },[]);

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();

    if (!hasHardware) {
      Alert.alert('Biometria nie jest wspierana');
      return
    }

    const response = await LocalAuthentication.authenticateAsync();
    if (response.success) {
      setUnlocked(true);
    }
    
  }

  if (!unlocked) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Aplikacja zablokowana</Text>
        <Text style={styles.sectionSubtitle}>Naciśnij kłódkę poniżej, by odblokować treść za pomocą biometrii</Text>
        <Ionicons onPress = {authenticate} name="lock-closed" size={64} color='#55BCF6'/>
      </View>
  );
  }

  return (
    <Home/>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 10
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight:'medium',
    marginBottom: 40,
    width: '80%',
    textAlign:'center',
    tintColor: '#C0C0C0'
  }
});
