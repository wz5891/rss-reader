import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text, Toggle } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setIsNight } from '../redux/actions/settingAction';

function SettingScreen(props) {
    const onIsNightChange = (isChecked) => {
        console.log(isChecked);
        props.dispatch(
            setIsNight(isChecked)
        );
    }

    return (
        <Layout style={styles.content}>
            <Layout style={styles.item}>
                <Text category="p1">夜间模式</Text>

                <Toggle checked={props.setting.get('isNight')} onChange={onIsNightChange}>
                </Toggle>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

const mapStateToProps = (state) => {
    const { setting } = state
    return { setting }
};

export default connect(mapStateToProps)(SettingScreen);
