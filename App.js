/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';



/* import { set } from 'react-native-reanimated'; */

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Btn from './src/components/Btn'
import Display from "./src/components/Display";

const App = () => {

  const [displayNum, setDisplayNum] = useState('0')
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operation, setOpertion] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  /*   const [state, setState] = useState({
      displayNum: '0',
      clearDisplay: false,
      operation: null,
      values: [0,0],
      current: 0
    }) */

  const initialState = {
    displayNum: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0

  }




  function addDigit(n) {

    
    const ClearDisplayN = displayNum === '0' || clearDisplay
    if (n === '.' && !ClearDisplayN && displayNum.includes('.')) {
      return
    }
    const currentValue = ClearDisplayN ? '' : displayNum
    const displayValueN = currentValue + n
    /* console.warn({ displayNum, clearDisplay: false }) */
    setDisplayNum(displayValueN)
    setClearDisplay(false)
    

    if (n !== '.') {
      const newValue = parseFloat(displayValueN)
      const value = [...values]
      value[current] = newValue
      setValues([...value])
      

    }

  }



  function clearMemory() {
    /* setState({...initialState}) */
    setDisplayNum('0')
    setClearDisplay(false)
    setOpertion(null)
    setValues([0, 0])
    setCurrent(0)
  }


  function OperationButtons(n) {
    if(current === 0){
      setOpertion(n)
      setCurrent(1)
      setClearDisplay(true)
    }else{
      const equals = operation === '='
      const value = [...values]
      try {
        value[0] = eval(`${value[0]} ${operation} ${value[1]}`)
        
      } catch (error) {
        value[0] = values[0]
      }

      value[1] = 0
      setDisplayNum(`${value[0]}`)
      const OperationN = equals ? null : n
      setOpertion(OperationN)
      const currentN = equals ? 0 : 1
      setCurrent(currentN)
      const clearDisplayN2 = !equals
      setClearDisplay(true)
      setValues([...value])

    }


  }






  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Display value={displayNum} />
        <View style={styles.buttons} >
          <Btn triple label='AC' onClick={() => { clearMemory() }} />
          <Btn operation label='/' onClick={OperationButtons} />
          <Btn label='7' onClick={addDigit} />
          <Btn label='8' onClick={addDigit} />
          <Btn label='9' onClick={addDigit} />
          <Btn operation label='*' onClick={OperationButtons} />
          <Btn label='4' onClick={addDigit} />
          <Btn label='5' onClick={addDigit} />
          <Btn label='6' onClick={addDigit} />
          <Btn operation label='-' onClick={OperationButtons} />
          <Btn label='1' onClick={addDigit} />
          <Btn label='2' onClick={addDigit} />
          <Btn label='3' onClick={addDigit} />
          <Btn operation label='+' onClick={OperationButtons} />
          <Btn double label='0' onClick={addDigit} />
          <Btn label='.' onClick={addDigit} />
          <Btn operation label='=' onClick={OperationButtons} />

        </View>


      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }

});

export default App;
