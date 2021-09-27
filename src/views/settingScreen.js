import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text, Toggle } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setIsNight } from '../redux/actions/settingAction';
import VersionNumber from 'react-native-version-number';

function SettingScreen(props) {
    const onIsNightChange = (isChecked) => {
        props.dispatch(
            setIsNight(isChecked)
        );
    }

    return (
        <Layout style={styles.content}>
            <Layout style={styles.section}>
                <Layout style={styles.item}>
                    <Text category="p1">夜间模式</Text>

                    <Toggle checked={props.setting.get('isNight')} onChange={onIsNightChange}>
                    </Toggle>
                </Layout>
            </Layout>

            <Text category="s2">关于</Text>
            <Layout style={styles.section}>
                <Layout style={styles.item}>
                    <Text category="p1">作者</Text>

                    <Text category="p1">LaoWei</Text>
                </Layout>
                <Layout style={styles.item}>
                    <Text category="p1">版本</Text>

                    <Text category="p1">{VersionNumber.appVersion}</Text>
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 10
    },
    section: {
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 4,
        borderColor: '#ddd',
        marginBottom: 20,
        marginTop: 3
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingBottom: 7
    }
})

const mapStateToProps = (state) => {
    const { setting } = state
    return { setting }
};

export default connect(mapStateToProps)(SettingScreen);
