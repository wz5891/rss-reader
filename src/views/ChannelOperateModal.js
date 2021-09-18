import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Card, Modal } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { setOperateModalVisble, unSubscript } from '../redux/actions/channelAction';
const ChannelOperateModal = (props) => {

    const closeModal = () => {
        props.dispatch(setOperateModalVisble(false));
    }

    const Header = (pro) => (
        <View {...pro}>
            <Text category='h6'>{props.channel.get('currentItem').get('title')}</Text>
        </View>
    );

    const unSubscript = () => {
        let channelId = props.get('currentChannelId');
        props.dispatch(unSubscript(channelId));
    }


    return (
        <Modal visible={props.channel.get('operateModalVisble')}
            onBackdropPress={closeModal}
            style={styles.modal} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card disabled={false} header={Header}>
                <TouchableOpacity style={styles.item} onPress={unSubscript}>
                    <Text category="s1">取消订阅</Text>
                </TouchableOpacity>
            </Card>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modal: {
        width: '95%'
    },

    item: {
        height: 40,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        marginBottom: 5,
    }
})


const mapStateToProps = (state) => {
    const { channel } = state
    return { channel }
};

export default connect(mapStateToProps)(ChannelOperateModal);