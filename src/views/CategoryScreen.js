import { Layout, Text, Icon, Divider } from '@ui-kitten/components'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import * as categoryAction from '../redux/actions/categoryAction';
import { initList, setLeftDrawerVisble } from '../redux/actions/channelAction';
import AddCategoryScreen from './AddCategoryScreen';

const MenuIcon = (props) => {
    return <Icon {...props} name='menu-arrow-outline' />
}

const CategoryScreen = (props) => {
    React.useEffect(() => {
        props.dispatch(categoryAction.list());
    }, []);


    const renderItem = ({ item }) => {
        let id = item.get('id');
        return <TouchableOpacity onPress={() => {
            props.dispatch(categoryAction.setCurrent(id));
            props.dispatch(setLeftDrawerVisble(false));

            let pageSize = props.channel.get('pageQuery').get('pageSize');
            props.dispatch(initList(pageSize, id));


        }}
            onLongPress={() => {
                // props.dispatch(setCurrentChannelId(id));
                // props.dispatch(setCurrentItem(id));
                // props.dispatch(setOperateModalVisble(true));
            }}
        >
            <Layout style={styles.item}>
                <Text category="s2">{item.get('title')}</Text>
            </Layout>
        </TouchableOpacity>
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
                    showsVerticalScrollIndicator={true}
                />
            </Layout>

            <Divider />
            <Layout style={{
                flex: 1,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <TouchableOpacity style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
                    onPress={() => {
                        props.dispatch(categoryAction.setAddCategoryModalVisble(true));
                    }}
                >
                    <Icon style={{
                        width: 24,
                        height: 24,
                    }} name='folder-outline' fill='#8F9BB3' />
                    <Text style={{
                        flex: 1,
                        marginLeft: 5
                    }}>新建分组</Text>
                </TouchableOpacity>
            </Layout>

            <AddCategoryScreen />
        </Layout>
    )
}


const styles = StyleSheet.create({

    item: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#8F9BB3',
        borderBottomWidth: 0.3,
    }
});




const mapStateToProps = (state) => {
    const { channel, category } = state
    return { channel, category }
};

export default connect(mapStateToProps)(CategoryScreen);