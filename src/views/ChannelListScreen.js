import { Layout, Text, Icon, Spinner, Modal, Card } from '@ui-kitten/components';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchAllChannelRss, initList, pageQuery, refresh, setCurrentChannelId, setOperateModalVisble } from '../redux/actions/channelAction';
import { setCurrentItem } from '../redux/actions/itemAction';
import AddChannelScreen from './AddChannelScreen';
import ChannelOperateModal from './ChannelOperateModal';

const ChannelListScreen = (props) => {
    useEffect(() => {
        let loading = props.channel.get('pageQuery').get('loading');
        if (!loading) {
            let pageSize = props.channel.get('pageQuery').get('pageSize');
            props.dispatch(initList(pageSize));
        }
    }, []);

    const renderItem = ({ item }) => {
        let id = item.get('id');
        return <TouchableWithoutFeedback onPress={() => {
            props.dispatch(setCurrentChannelId(id));
            props.navigation.navigate('ItemListScreen');
        }}
            onLongPress={() => {
                props.dispatch(setCurrentChannelId(id));
                props.dispatch(setCurrentItem(id));
                props.dispatch(setOperateModalVisble(true));
            }}
        >
            <Layout style={styles.item}>
                <Icon style={{
                    width: 24,
                    height: 24,
                }} name='cast-outline' fill='#8F9BB3' />

                <Text style={{ flex: 1, marginLeft: 12, }} category="p1">{item.get('title')}</Text>


                <Text category="c2">{item.get('unReadNumber')}</Text>

            </Layout>
        </TouchableWithoutFeedback>
    }

    const onRefresh = () => {
        // let loading = props.channel.get('pageQuery').get('loading');
        // if (!loading) {
        //     let pageSize = props.channel.get('pageQuery').get('pageSize');
        //     props.dispatch(refresh(pageSize));
        // }

        let loading = props.channel.get('fetchAll').get('loading');
        if (!loading) {
            props.dispatch(fetchAllChannelRss(props.channel.get('pageQuery').get('pageSize')));
        }
    }
    const onEndReached = () => {
        let loading = props.channel.get('pageQuery').get('loading');
        if (!loading) {
            let hasMore = props.channel.get('pageQuery').get('hasMore');
            if (hasMore) {
                let pageIndex = props.channel.get('pageQuery').get('pageIndex');
                let pageSize = props.channel.get('pageQuery').get('pageSize');
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
                    props.channel.get('pageQuery').get('loading') == true &&
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
                    props.channel.get('pageQuery').get('loading') == false && props.channel.get('pageQuery').get('hasMore') == false &&
                    <Text category="p2">-没有更多啦-</Text>
                }

                {
                    props.channel.get('pageQuery').get('loading') == false && props.channel.get('pageQuery').get('hasMore') == true &&
                    <Text category="p2">上拉加载更多</Text>
                }

            </Layout>);
    }

    return (
        <Layout style={styles.content}>
            <FlatList
                data={props.channel.get('pageQuery').get('dataList').toArray()}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.get('id')
                }}
                onRefresh={onRefresh}
                refreshing={props.channel.get('pageQuery').get('refreshing')}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={ListFooterComponent}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
            <AddChannelScreen />
            <ChannelOperateModal />
        </Layout>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        display: 'flex',
        padding: 10
    },
    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomColor: '#8F9BB3',
        borderBottomWidth: 0.5,
    }
});


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(ChannelListScreen);