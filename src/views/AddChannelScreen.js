import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Icon, Input, Card, Modal, Button, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { addChannel, setAddChannelModalVisble } from '../redux/actions/channelAction';
const AddChannelScreen = (props) => {
    const [url, setUrl] = useState('');

    const LoadingIndicator = () => {
        if (props.channel.get('add').get('doing')) {
            return <Spinner size='small' status='control' />;
        } else {
            return null;
        }
    }

    const closeModal = () => {
        props.dispatch(setAddChannelModalVisble(false));
    }

    const addRss = () => {
        if (!url) {
            alert('RSS地址不能为空');
            return;
        }
        props.dispatch(addChannel(url));
        setUrl('');
    }

    const Header = (props) => (
        <View {...props}>
            <Text category='h6'>新建订阅</Text>
        </View>
    );

    const Footer = (props) => (
        <View {...props} style={[props.style, styles.footerContainer]}>
            <Button
                style={styles.footerControl}
                size='small'
                status='basic' onPress={closeModal}>
                取消
            </Button>
            <Button
                style={styles.footerControl}
                size='small'
                onPress={addRss} accessoryLeft={LoadingIndicator}>
                保存
            </Button>
        </View>
    );

    return (
        <Modal visible={props.channel.get('channelModalVisble')} style={styles.modal} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card disabled={false} header={Header} footer={Footer}>
                <Input
                    size="medium"
                    placeholder='请输入RSS地址'
                    value={url}
                    onChangeText={nextValue => setUrl(nextValue)}
                />

                <Text style={{
                    marginTop: 10
                }} status='warning'>{props.channel.get('add').get('errorMsg')}</Text>
            </Card>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '95%'
    },

    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
})


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(AddChannelScreen);