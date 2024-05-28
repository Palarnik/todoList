import React, {startTransition, useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  React.useEffect(() => {
    const asyncAction = async () => {
      try {
        const loadedData = await getData();
        setTaskItems(loadedData);
      } catch (e) {
        console.log(e)
      }
    }
    asyncAction();
  }, []);


  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
    storeData([...taskItems, task]);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    storeData(itemsCopy);
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue);
      await AsyncStorage.setItem('@storage', jsonValue);
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (err) {
      console.log(err);
    }

  }


  return (
    
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
      <Text style={styles.sectionTitle}>Zadania do wykonania</Text>
      <View style={styles.items}>
      {
        taskItems.map((item, index)=> {
          return (
           <TouchableOpacity  key = {index} onPress={()=>completeTask(index)}>
            <Task text={item}/>
          </TouchableOpacity>
          ) 
        }
        )
      }
      </View>
      </View>
    <KeyboardAvoidingView 
    behavior={Platform.OS === "ios" ? "padding": "height"} 
    style={styles.writeTaskWrapper}
    >
      <TextInput style={styles.input} placeholder={'Podaj nazwę zadania...'} value = {task} onChangeText={text => setTask(text)}/>
      <TouchableOpacity onPress={() => handleAddTask()} >
        <View style={styles.addWrapper}>
        <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight:'bold',
  },
  items: {
    marginTop: 20
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1

  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addText: {
    fontSize: 24,
    tintColor: '#C0C0C0'
  },
});
