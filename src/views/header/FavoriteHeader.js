import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Icon, TopNavigation, TopNavigationAction, OverflowMenu, MenuItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setAddChannelModalVisble } from '../../redux/actions/channelAction';



const FavoriteHeader = (props) => {

    return (
        <Layout style={styles.header}>
            <TopNavigation
                alignment='center'
                title='收藏'
                alignment="start"
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    header: {
    }
})


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(FavoriteHeader);