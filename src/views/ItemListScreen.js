import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { pageQuery, refresh } from '../redux/actions/itemAction';
import { setCurrentChannel } from '../redux/actions/channelAction';
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

const ItemListScreen = (props) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    useEffect(() => {
        props.dispatch(pageQuery(1, 10, props.channel.get('currentChannelId')));

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
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15
            }}>
                <Layout style={{
                    flex: 1,
                    padding: 2
                }}>
                    <Layout style={{
                        flex: 1,
                    }}>
                        <Text category="s1">{item.get('title')}</Text>
                        <Text category="s2">{item.get('description')}</Text>
                    </Layout>
                    <Layout style={{
                        flex: 1,
                        marginTop: 5
                    }}>
                        <Text category="p2">{moment(item.get('publishedTime')).format('yyyy-MM-DD HH:mm:ss')}</Text>

                    </Layout>
                </Layout>

                <Image
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 5
                    }}
                    source={{
                        uri: item.get('imageUrl')
                    }}
                />
            </Layout>
        </TouchableWithoutFeedback>
    }

    const onRefresh = () => {
        let loading = props.item.get('pageQuery').get('loading');
        if (!loading) {
            let pageSize = props.item.get('pageQuery').get('pageSize');
            let channelId = props.channel.get('currentChannelId');
            props.dispatch(refresh(pageSize, channelId));
        }
    }
    const onEndReached = () => {
        let loading = props.item.get('pageQuery').get('loading');
        if (!loading) {
            let hasMore = props.item.get('pageQuery').get('hasMore');
            if (hasMore) {
                let pageIndex = props.item.get('pageQuery').get('pageIndex');
                let pageSize = props.item.get('pageQuery').get('pageSize');
                props.dispatch(pageQuery(pageIndex, pageSize));
            }
        }
    }
    const ListFooterComponent = () => {
        return (
            <Layout style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 1,
                height: 50
            }}>
                {
                    props.item.get('pageQuery').get('loading') == true &&
                    <Layout style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Spinner />
                        <Text style={{ marginLeft: 5 }} category="p2">加载中...</Text>
                    </Layout>
                }

                {
                    props.item.get('pageQuery').get('loading') == false && props.item.get('pageQuery').get('hasMore') == false &&
                    <Text category="p2">-没有更多啦-</Text>
                }

                {
                    props.item.get('pageQuery').get('loading') == false && props.item.get('pageQuery').get('hasMore') == true &&
                    <Text category="p2">上拉加载更多</Text>
                }

            </Layout>);
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
                data={props.item.get('pageQuery').get('dataList').toArray()}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.get('id')
                }}
                onRefresh={onRefresh}
                refreshing={props.item.get('pageQuery').get('refreshing')}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={ListFooterComponent}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
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
