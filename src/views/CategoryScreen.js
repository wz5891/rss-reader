import { Layout, Text, Icon, Divider } from '@ui-kitten/components'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux';
import * as categoryAction from '../redux/actions/categoryAction';
import { setLeftDrawerVisble } from '../redux/actions/channelAction';

const MenuIcon = (props) => {
    return <Icon {...props} name='menu-arrow-outline' />
}

const CategoryScreen = (props) => {
    React.useEffect(() => {
        props.dispatch(categoryAction.list());
    }, []);


    const renderItem = ({ item }) => {
        let id = item.get('id');
        return <TouchableWithoutFeedback onPress={() => {
            // props.dispatch(setCurrentChannelId(id));
            // props.navigation.navigate('ItemListScreen');
        }}
            onLongPress={() => {
                // props.dispatch(setCurrentChannelId(id));
                // props.dispatch(setCurrentItem(id));
                // props.dispatch(setOperateModalVisble(true));
            }}
        >
            <Layout>
                <Text style={{ flex: 1, marginLeft: 12, }} category="p1">{item.get('title')}</Text>
            </Layout>
        </TouchableWithoutFeedback>
    }

    return (
        <Layout style={{ flex: 1, padding: 10, flexDirection: 'column', display: 'flex', }}>
            <Layout style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10
            }}>
                <Text category="s1" style={{ flex: 1 }}>分组</Text>
                <TouchableOpacity onPress={() => {
                    props.dispatch(setLeftDrawerVisble(false));
                }}>
                    <MenuIcon style={{
                        width: 24,
                        height: 24,
                    }} fill='#8F9BB3' />
                </TouchableOpacity>
            </Layout>

            <Divider />

            <Layout style={{
                flex: 2,
                marginTop: 10
            }}>
                <FlatList
                    data={props.category.get('list').get('dataList').toArray()}
                    renderItem={renderItem}
                    keyExtractor={(item) => {
                        return item.get('id')
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </Layout>

            <Divider />
            <Layout style={{
                flex: 1,
                marginTop: 10
            }}>
                <Text>新建分组</Text>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({})




const mapStateToProps = (state) => {
    const { channel, category } = state
    return { channel, category }
};

export default connect(mapStateToProps)(CategoryScreen);