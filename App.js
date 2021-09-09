import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry, Card, BottomNavigation, BottomNavigationTab, } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChannelListScreen from './src/views/ChannelListScreen';
import FavoriteScreen from './src/views/FavoriteScreen';
import SettingScreen from './src/views/SettingScreen';
import { getHeaderTitle } from '@react-navigation/elements';

import { connect } from 'react-redux';
import { getDatabase } from './src/db/Database';
import ChannelListHeader from './src/views/header/ChannelListHeader';

const { Navigator, Screen } = createBottomTabNavigator();


const ChannelIcon = (props) => (
  <Icon {...props} name='cast-outline' />
);

const FavoriteIcon = (props) => (
  <Icon {...props} name='star-outline' />
);

const SettingIcon = (props) => (
  <Icon {...props} name='settings-2-outline' />
);


const header = ({ navigation, route, options }) => {
  let name = route.name;

  if (name == 'ChannelList') {
    return <ChannelListHeader />;
  }

  const title = getHeaderTitle(options, route.name);
  console.log(route.name);

  return <MyHeader title={title} style={options.headerStyle} />;
};

const MyHeader = ({ title, style }) => {
  return (
    <Layout>
      <Text>{title}
      </Text>
    </Layout>);
}

function RssTopRight() {
  return (
    <Layout style={{ display: 'flex', flexDirection: 'row' }}>
      <Icon
        style={{
          width: 24,
          height: 24,
          marginRight: 10
        }}
        fill='#8F9BB3'
        name='sync-outline'
      />
      <Icon
        style={{
          width: 24,
          height: 24,
          marginRight: 10
        }}
        fill='#8F9BB3'
        name='plus-outline'
      />
    </Layout>
  );
}

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='订阅' icon={ChannelIcon} />
    <BottomNavigationTab title='收藏' icon={FavoriteIcon} />
    <BottomNavigationTab title='设置' icon={SettingIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{
    header: header
  }}  >
    <Screen name="ChannelList" component={ChannelListScreen} options={{
      title: '订阅',
      headerRight: () => (
        <RssTopRight></RssTopRight>
      ),
    }} headerShown={false} />
    <Screen name='收藏' component={FavoriteScreen} />
    <Screen name='设置' component={SettingScreen} />
  </Navigator>
);

const App = (props) => {
  React.useEffect(async () => {
    await getDatabase();
  }, [])


  return (<NavigationContainer>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={props.setting.get('isNight') ? eva.dark : eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  </NavigationContainer>);
}


const mapStateToProps = (state) => {
  const { setting } = state
  return { setting }
};

export default connect(mapStateToProps)(App);
