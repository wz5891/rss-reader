import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { pageQueryItem, setCurrentItemlId } from '../redux/actions/itemAction';
import { setCurrentChannel } from '../redux/actions/channelAction';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const EditIcon = (props) => (
    <Icon {...props} name='edit' />
);

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

const InfoIcon = (props) => (
    <Icon {...props} name='info' />
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
);

const ItemListScreen = (props) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    useEffect(() => {
        props.dispatch(pageQueryItem(1, 10, props.channel.get('currentChannelId')));

        props.dispatch(setCurrentChannel(props.channel.get('currentChannelId')));
    }, [])

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );

    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={EditIcon} />
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='About' />
                <MenuItem accessoryLeft={LogoutIcon} title='Logout' />
            </OverflowMenu>
        </React.Fragment>
    );

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => {
            props.navigation.goBack();
        }} />
    );

    const renderItem = ({ item }) => {
        let id = item.get('id');
        return <TouchableWithoutFeedback onPress={() => {
            props.dispatch(setCurrentItemlId(id));
            props.navigation.navigate('ItemDetailScreen');
        }}>
            <Layout style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                borderBottomWidth: 1,
                padding: 10
            }}>

                <Text>{item.get('title')}</Text>
                <Text>{item.get('description')}</Text>

            </Layout>
        </TouchableWithoutFeedback>
    }

    return (
        <Layout style={styles.container} level='1'>
            <TopNavigation
                alignment='center'
                title={props.channel.get('currentChannel').get('title')}
                subtitle={props.channel.get('currentChannel').get('description')}
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />


            <FlatList
                data={props.item.get('itemList').toArray()}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.get('id')
                }}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});


const mapStateToProps = (state) => {
    const { item, channel } = state
    return { item, channel }
};

export default connect(mapStateToProps)(ItemListScreen);
