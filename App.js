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
import ItemDetailScreen from './src/views/ItemDetailScreen';
import { StatusBar } from 'react-native';
import codePush from "react-native-code-push";
import CategoryScreen from './src/views/CategoryScreen';
import Drawer from 'react-native-drawer'
import { setLeftDrawerVisble } from './src/redux/actions/channelAction';

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

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
    <Stack.Screen
      name="ItemDetailScreen"
      component={ItemDetailScreen}
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
      <Drawer
        type="displace"
        openDrawerOffset={0.2}
        content={<CategoryScreen />}
        open={props.channel.get('leftDrawerVisble')}
        captureGestures={false}
        styles={{
          drawer: { shadowColor: '#555555', shadowOpacity: 1, shadowRadius: 13 },
          mainOverlay: {
            backgroundColor: 'black',
            opacity: 0,
          },
        }}

        // 打开/关闭 Drawer所需要的时间
        tweenDuration={100}
        // 触发抽屉打开/关闭必须经过的屏幕宽度比例
        panThreshold={0.08}

        tweenHandler={(ratio) => ({
          mainOverlay: {
            opacity: ratio / 2,
          }
        })}
        onOpen={() => {
          console.log('onopen')
          props.dispatch(setLeftDrawerVisble(true));
        }}
        onClose={() => {
          console.log('onclose')
          props.dispatch(setLeftDrawerVisble(false));
        }}
        acceptTap={false}
        disabled={false}

      >
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden  
          hidden={false}  //是否隐藏状态栏。  
          backgroundColor={props.setting.get('isNight') ? '#222b44' : 'white'} //状态栏的背景色  
          translucent={false}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。  
          barStyle={props.setting.get('isNight') ? 'light-content' : 'dark-content'} // enum('default', 'light-content', 'dark-content')   
        >
        </StatusBar>
        <StackNavigator />
      </Drawer>
    </ApplicationProvider>
  </NavigationContainer>);
}


const mapStateToProps = (state) => {
  const { setting, channel } = state
  return { setting, channel }
};

export default connect(mapStateToProps)(codePush(App));
