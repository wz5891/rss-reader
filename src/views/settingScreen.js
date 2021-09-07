import React from 'react'
import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components';

export default function SettingScreen() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>SETTING</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({})
