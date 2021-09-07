import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, IconRegistry, Card, BottomNavigation, BottomNavigationTab, } from '@ui-kitten/components';
import { Button, Icon } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();


const RssListIcon = (props) => (
  <Icon {...props} name='cast-outline' />
);

const CollectIcon = (props) => (
  <Icon {...props} name='star-outline' />
);

const SettingIcon = (props) => (
  <Icon {...props} name='settings-2-outline' />
);

const RssListScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>RSSLIST</Text>
  </Layout>
);


const CollectScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>COLLECT</Text>
  </Layout>
);

const SettingScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>SETTING</Text>
  </Layout>
);

const StarIcon = (props) => (
  <Icon {...props} name='star' />
);

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
    <BottomNavigationTab title='订阅' icon={RssListIcon} />
    <BottomNavigationTab title='收藏' icon={CollectIcon} />
    <BottomNavigationTab title='设置' icon={SettingIcon} />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="RssList" component={RssListScreen} options={{
      title: '订阅',
      headerRight: () => (
        <RssTopRight></RssTopRight>
      ),
    }} />
    <Screen name='收藏' component={CollectScreen} />
    <Screen name='设置' component={SettingScreen} />
  </Navigator>
);

export default () => (
  <NavigationContainer>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <TabNavigator />
    </ApplicationProvider>
  </NavigationContainer>
);
