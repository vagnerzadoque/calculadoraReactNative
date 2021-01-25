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
  const [displayNum, setDisplayNum] = useState(0)
  const [operation, setOperation] = useState(null)
  const [clearDisplay, setClearDisplay] = useState(true)
  const [clearDisplay2, setClearDisplay2] = useState(true)
  const [currentValue, setCurrentValue] = useState(false)
  const [LadoA, setLadoA] = useState(0)
  const [LadoB, setLadoB] = useState(0)
  const [goOperation, setGoOperation] = useState(true)



  function addDigit(n) {

    if (displayNum === 0) {
      setDisplayNum(n)
      setLadoA(n)
    } else {
      if (currentValue === false) {
        setDisplayNum(displayNum + n)
        setLadoA(displayNum + n)
        alert('LadoA')

      } else {
        if (clearDisplay === true) {
          setDisplayNum(n)
          setClearDisplay(false)
          setLadoB(n)


        } else {
          if (clearDisplay2 === true) {

            setDisplayNum(n)
            setLadoB(n)
            setClearDisplay2(false)
           /*  alert('LadoB') */
          } else {
            setDisplayNum(displayNum + n)
            setLadoB(displayNum + n)
          }
        }




      }
    }
  }

  function OperationButtons(n) {

    if (goOperation) {

      if (n !== '=') {
        setOperation(n)
      }else{
        return
      }
      setCurrentValue(!currentValue)
      setClearDisplay(!clearDisplay)
      setGoOperation(false)

    } else {
      const resp = executeOperation(LadoA, operation, LadoB)
      setDisplayNum(resp)
      setLadoA(resp)
      setGoOperation(!goOperation)
      setCurrentValue(!currentValue)
      setClearDisplay(true)
      setClearDisplay2(true)
      if (n !== '=') {

        setLadoA(resp)
      }

    }
  }

  function clearMemory() {
    setDisplayNum(0)
    setOperation(null)
    setClearDisplay(true)
    setClearDisplay2(true)
    setCurrentValue(false)
    setLadoA(0)
    setLadoB(0)
    setGoOperation(true)
  }


  function executeOperation(ladoA, operation, ladoB) {
    console.warn(ladoA, operation, ladoB)
    return eval(`${ladoA} ${operation} ${ladoB}`)
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
          <Btn label='.' />
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
