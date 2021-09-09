import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text, Icon, Input, Card, Modal, Button, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { addChannel, setAddChannelModalVisble } from '../redux/actions/channelAction';
const AddChannelScreen = (props) => {
    const [url, setUrl] = useState('');


    const LoadingIndicator = (props) => (
        <Layout style={[props.style, styles.indicator]}>
            <Spinner size='small' />
        </Layout>
    );

    const closeModal = () => {
        props.dispatch(setAddChannelModalVisble(false));
    }

    const addRss = () => {
        if (!url) {
            alert('RSS地址不能为空');
            return;
        }

        props.dispatch(addChannel(url));

        closeModal();
    }


    return (
        <Modal visible={props.channel.get('channelModalVisble')} onBackdropPress={closeModal} style={styles.modal} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card disabled={false}>
                <Text>请输入RSS地址</Text>

                <Input
                    placeholder='RSS地址'
                    value={url}
                    onChangeText={nextValue => setUrl(nextValue)}
                />


                <Button style={styles.button}
                    appearance='outline'
                    accessoryLeft={LoadingIndicator}
                    size="small"
                    status="primary"
                    onPress={addRss}
                >
                    确定
                </Button>

            </Card>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '90%'
    },
    button: {
        marginTop: 5,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(AddChannelScreen);