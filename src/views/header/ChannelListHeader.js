import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ApplicationProvider, Layout, Text, Icon, IconRegistry, Card, BottomNavigation, BottomNavigationTab, Modal } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setAddChannelModalVisble } from '../../redux/reducers/channelAction';

const ChannelListHeader = (props) => {
    const addChannel = () => {
        props.dispatch(setAddChannelModalVisble(true));
    }

    return (
        <Layout style={styles.header}>
            <Text category="h6" style={{
                flex: 1
            }}>订阅</Text>

            <Icon
                style={{
                    width: 24,
                    height: 24,
                    marginRight: 20
                }}
                fill='#8F9BB3'
                name='sync-outline'
            />
            <Icon
                style={{
                    width: 24,
                    height: 24,
                    marginRight: 10
                }}
                fill='#8F9BB3'
                name='plus-outline'
                onPress={addChannel}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomColor: '#8B8386',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 10
    }
})


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(ChannelListHeader);