import React from 'react';
import { StyleSheet } from 'react-native'

import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost'


import Routes from './src/routes';




export default function App() {

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if (!fontsLoaded) return <AppLoading />

  return (
    <Routes />
  )

}


const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  }
})
