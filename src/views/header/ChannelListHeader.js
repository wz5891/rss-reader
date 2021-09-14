import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Icon, TopNavigation, TopNavigationAction, OverflowMenu, MenuItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { fetchAllChannelRss, setAddChannelModalVisble } from '../../redux/actions/channelAction';


const SyncIcon = (props) => (
    <Icon {...props} name='sync-outline' />
);

const PlusIcon = (props) => (
    <Icon {...props} name='plus-outline' />
);

const ChannelListHeader = (props) => {
    const renderRightActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={SyncIcon} onPress={() => {
                props.dispatch(fetchAllChannelRss());
            }} />

            <TopNavigationAction icon={PlusIcon} onPress={() => {
                props.dispatch(setAddChannelModalVisble(true));
            }} />
        </React.Fragment>
    );


    return (
        <Layout style={styles.header}>
            <TopNavigation
                alignment='center'
                title='订阅'
                alignment="start"
                accessoryRight={renderRightActions}
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

export default connect(mapStateToProps)(ChannelListHeader);