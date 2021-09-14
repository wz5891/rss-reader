import React, { useEffect } from 'react';
import { Icon, Layout, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { pageQuery, refresh, setOperateModalVisble } from '../redux/actions/favoriteAction';
import { setCurrentItem, setCurrentItemlId } from '../redux/actions/itemAction';
import moment from 'moment';


const FavoriteScreen = (props) => {
    useEffect(() => {
        props.dispatch(refresh(10));
    }, [])


    const renderItem = ({ item }) => {
        let id = item.get('id');
        let hasRead = item.get('hasRead');
        console.log('hasRead=>', hasRead);
        return <TouchableOpacity onPress={() => {
            props.dispatch(setCurrentItemlId(id));
            props.navigation.navigate('ItemDetailScreen');
        }}
        >
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
        let loading = props.favorite.get('pageQuery').get('loading');
        if (!loading) {
            let pageSize = props.favorite.get('pageQuery').get('pageSize');
            props.dispatch(refresh(pageSize));
        }
    }
    const onEndReached = () => {
        let loading = props.favorite.get('pageQuery').get('loading');
        if (!loading) {
            let hasMore = props.favorite.get('pageQuery').get('hasMore');
            if (hasMore) {
                let pageIndex = props.favorite.get('pageQuery').get('pageIndex');
                let pageSize = props.favorite.get('pageQuery').get('pageSize');
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
                    props.favorite.get('pageQuery').get('loading') == true &&
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
                    props.favorite.get('pageQuery').get('loading') == false && props.favorite.get('pageQuery').get('hasMore') == false &&
                    <Text category="p2">-没有更多啦-</Text>
                }

                {
                    props.favorite.get('pageQuery').get('loading') == false && props.favorite.get('pageQuery').get('hasMore') == true &&
                    <Text category="p2">上拉加载更多</Text>
                }

            </Layout>);
    }

    return (
        <Layout style={styles.container} level='1'>
            <FlatList
                data={props.favorite.get('pageQuery').get('dataList').toArray()}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.get('id')
                }}
                onRefresh={onRefresh}
                refreshing={props.favorite.get('pageQuery').get('refreshing')}
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
    const { favorite } = state
    return { favorite }
};

export default connect(mapStateToProps)(FavoriteScreen);
