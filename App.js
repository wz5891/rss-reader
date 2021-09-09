import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';


import { connect } from 'react-redux';
import { getDatabase } from './src/db/Database';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/views/HomeScreen';
import ItemListScreen from './src/views/ItemListScreen';






const Stack = createStackNavigator();
const StackNavigator = () => {
  return <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
    />
    <Stack.Screen
      name="ItemListScreen"
      component={ItemListScreen}
    />
  </Stack.Navigator>
}
const App = (props) => {
  React.useEffect(async () => {
    await getDatabase();
  }, [])

  return (<NavigationContainer>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={props.setting.get('isNight') ? eva.dark : eva.light}>
      <StackNavigator />
    </ApplicationProvider>
  </NavigationContainer>);
}


const mapStateToProps = (state) => {
  const { setting } = state
  return { setting }
};

export default connect(mapStateToProps)(App);
