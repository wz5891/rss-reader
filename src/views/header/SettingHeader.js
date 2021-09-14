import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, TopNavigation, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';


const SettingHeader = (props) => {


    return (
        <Layout style={styles.header}>
            <TopNavigation
                alignment='center'
                title='设置'
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

export default connect(mapStateToProps)(SettingHeader);