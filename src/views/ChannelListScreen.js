import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { pageQueryChannel } from '../redux/reducers/channelAction';
import AddChannelScreen from './AddChannelScreen';

const ChannelListScreen = (props) => {

    useEffect(() => {
        props.dispatch(pageQueryChannel(1, 10));
    }, []);

    const renderItem = ({ item }) => {
        console.log('===>', item);
        // return <Text>{item.get('title')}</Text>;

        return <Layout style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            borderWidth: 1,
            padding: 10
        }}>
            <Text>{item.get('title')}</Text>
            <Text>{item.get('description')}</Text>
        </Layout>
    }

    return (
        <Layout style={{ flex: 1 }}>
            <FlatList
                data={props.channel.get('channelList').toArray()}
                renderItem={renderItem}
                keyExtractor={(item) => {
                    return item.get('id')
                }}
            />

            <AddChannelScreen />
        </Layout>
    );
}

const styles = StyleSheet.create({});


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(ChannelListScreen);