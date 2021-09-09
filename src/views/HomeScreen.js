import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ApplicationProvider, Layout, Text, IconRegistry, Card, BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChannelListScreen from './ChannelListScreen';
import FavoriteScreen from './FavoriteScreen';
import SettingScreen from './SettingScreen';
import ChannelListHeader from './header/ChannelListHeader';
import { getHeaderTitle } from '@react-navigation/elements';

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



const HomeScreen = () => {
    return (
        <TabNavigator />
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
