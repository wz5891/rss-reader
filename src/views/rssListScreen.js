import { Layout, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

function RssListScreen() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>RSSLIST</Text>
        </Layout>
    );
}

const styles = StyleSheet.create({});


const mapStateToProps = (state) => {
    const { subjects } = state
    return { subjects }
};

export default connect(mapStateToProps)(RssListScreen);