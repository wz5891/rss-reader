import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentItem } from '../redux/actions/itemAction';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';

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


const ItemDetailScreen = (props) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    useEffect(() => {
        props.dispatch(setCurrentItem(props.item.get('currentItemId')));
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

    const { width } = useWindowDimensions();

    return (
        <Layout style={styles.container} level='1'>
            <TopNavigation
                alignment='center'
                title=''
                subtitle=''
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />


            {!props.item.get('currentItem').get('id') &&
                <Layout style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner />
                </Layout>
            }

            {props.item.get('currentItem').get('id') &&
                <ScrollView style={{
                    padding: 10
                }}>
                    <Text category="h5">{props.item.get('currentItem').get('title')}</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: props.item.get('currentItem').get('content')
                        }}
                        style={{
                            width: '90%'
                        }}
                        ignoredDomTags={['iframe']}
                    />
                </ScrollView>
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%'
    },
});


const mapStateToProps = (state) => {
    const { item } = state
    return { item }
};

export default connect(mapStateToProps)(ItemDetailScreen);
