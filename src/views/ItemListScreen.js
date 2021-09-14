import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import { markAllRead, markAllUnRead, pageQuery, refresh, setCurrentItem, setCurrentItemlId, setOperateModalVisble } from '../redux/actions/itemAction';
import { fetchChannelRss, setCurrentChannel, setSingleChannelMenuVisble } from '../redux/actions/channelAction';
import moment from 'moment';
import ItemOperateModal from './ItemOperateModal';
import { cutString } from '../util/StringUitl';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);


const CheckIcon = (props) => (
    <Icon {...props} name='checkmark-outline' />
);
const UnCheckIcon = (props) => (
    <Icon {...props} name='close-outline' />
);

const ItemListScreen = (props) => {
    // 动画相关开始
    const animationValue = React.useRef(new Animated.Value(0)).current;

    let animated = null;
    const startAnimate = () => {
        if (animated) {
            animated.stop();
        }
        animationValue.setValue(0);
        animated = Animated.loop(Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.in,
            useNativeDriver: true,
        }));
        animated.start();
    };

    React.useEffect(() => {
        return () => {
            if (animated != null) {
                animated.stop();
            }
        }
    }, []);

    let rotateZ = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    // 业务相关开始
    useEffect(() => {
        let channelId = props.channel.get('currentChannelId');
        props.dispatch(refresh(10, channelId));

        props.dispatch(setCurrentChannel(channelId));
    }, [])

    const toggleMenu = () => {
        let singleChannelMenuVisble = props.channel.get('singleChannelMenuVisble');
        props.dispatch(setSingleChannelMenuVisble(!singleChannelMenuVisble));
    };

    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );
    const freshRss = () => {
        let channelId = props.channel.get('currentChannelId');
        startAnimate()
        props.dispatch(fetchChannelRss(channelId));
    }

    const markAllReadAction = () => {
        let channelId = props.channel.get('currentChannelId');

        props.dispatch(markAllRead(channelId));
    }
    const markAllUnReadAction = () => {
        let channelId = props.channel.get('currentChannelId');

        props.dispatch(markAllUnRead(channelId));
    }

    const SyncIcon = (props) => (
        <Icon {...props} name='sync-outline' />
    )

    const renderRightActions = () => (
        <React.Fragment>
            {
                props.channel.get('fetchingSingle') == true &&
                <Animated.View
                    style={{
                        transform: [{ rotateZ: rotateZ }],
                    }}>
                    <TopNavigationAction icon={SyncIcon} />
                </Animated.View>
            }
            {
                props.channel.get('fetchingSingle') == false &&
                <TopNavigationAction icon={SyncIcon} onPress={() => {
                    freshRss();
                }} />
            }

            <OverflowMenu
                style={{
                    width: 150
                }}
                anchor={renderMenuAction}
                visible={props.channel.get('singleChannelMenuVisble')}
                onBackdropPress={toggleMenu}>

                <MenuItem accessoryLeft={CheckIcon} title='全标为已读' onPress={markAllReadAction} />
                <MenuItem accessoryLeft={UnCheckIcon} title='全标为未读' onPress={markAllUnReadAction} />
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
        let hasRead = item.get('hasRead');
        return <TouchableOpacity onPress={() => {
            props.dispatch(setCurrentItemlId(id));
            props.navigation.navigate('ItemDetailScreen');
        }} onLongPress={() => {
            props.dispatch(setCurrentItemlId(id));
            props.dispatch(setCurrentItem(id));
            props.dispatch(setOperateModalVisble(true));
        }}
        >
            <Layout style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                opacity: hasRead ? 0.6 : 1,
            }}>
                <Layout style={{
                    flex: 1,
                    padding: 2
                }}>
                    <Layout style={{
                        flex: 1,
                    }}>
                        <Text category="s1" numberOfLines={2} ellipsizeMode="tail">{item.get('title')}</Text>
                        <Text category="s2" numberOfLines={2} ellipsizeMode="tail">{item.get('description')}</Text>
                    </Layout>
                    <Layout style={{
                        flex: 1,
                        marginTop: 5
                    }}>
                        <Text category="p2">{moment(item.get('publishedTime')).format('yyyy-MM-DD HH:mm:ss')}</Text>

                    </Layout>
                </Layout>

                {item.get('imageUrl') != '' && <Image
                    style={{
                        height: 70,
                        width: 70,
                        borderRadius: 5
                    }}
                    source={{
                        uri: item.get('imageUrl')
                    }}
                />}
            </Layout>
        </TouchableOpacity>
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
                let channelId = props.channel.get('currentChannelId');
                let pageIndex = props.item.get('pageQuery').get('pageIndex');
                let pageSize = props.item.get('pageQuery').get('pageSize');
                props.dispatch(pageQuery(pageIndex, pageSize, channelId));
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
                subtitle={cutString(props.channel.get('currentChannel').get('description'), 15)}
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

            <ItemOperateModal />
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
