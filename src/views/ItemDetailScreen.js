import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentItem } from '../redux/actions/itemAction';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import moment from 'moment';

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

    const formatePublishedTime = (publishedTime) => {
        if (publishedTime) {
            return moment(publishedTime).format('yyyy-MM-DD HH:mm:ss');
        } else {
            return '';
        }
    }


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
                    <Layout style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                        <Text category="p2">{props.channel.get('currentChannel').get('title')}</Text>

                        <Text category="p2">{formatePublishedTime(props.item.get('currentItem').get('publishedTime'))}</Text>
                    </Layout>
                    <Text category="h5">{props.item.get('currentItem').get('title')}</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: props.item.get('currentItem').get('content') ? props.item.get('currentItem').get('content') : props.item.get('currentItem').get('description')
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
        paddingBottom: 20
    },
});


const mapStateToProps = (state) => {
    const { item, channel } = state
    return { item, channel }
};

export default connect(mapStateToProps)(ItemDetailScreen);
