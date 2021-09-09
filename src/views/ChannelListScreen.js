import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as rssParser from 'react-native-rss-parser';

const ChannelListScreen = (props) => {
    useEffect(() => {
        fetch('https://www.ruanyifeng.com/blog/atom.xml')
            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then((rss) => {
                console.log(rss.title);
                console.log(rss.items.length);
                console.log(JSON.stringify(rss));
            });
    }, [])

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

export default connect(mapStateToProps)(ChannelListScreen);