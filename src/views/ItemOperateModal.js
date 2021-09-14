import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Layout, Text, Icon, Input, Card, Modal, Button, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { markItemRead, markItemUnRead, setOperateModalVisble } from '../redux/actions/itemAction';
const ItemOperateModal = (props) => {

    const closeModal = () => {
        props.dispatch(setOperateModalVisble(false));
    }

    const Header = (pro) => (
        <View {...pro}>
            <Text category='h6'>{props.item.get('currentItem').get('title')}</Text>
        </View>
    );

    const markRead = () => {
        let itemId = props.item.get('currentItem').get('id');
        props.dispatch(markItemRead(itemId));

        closeModal();
    }

    const markUnRead = () => {
        let itemId = props.item.get('currentItem').get('id');
        props.dispatch(markItemUnRead(itemId));

        closeModal();
    }

    return (
        <Modal visible={props.item.get('operateModalVisble')}
            onBackdropPress={closeModal}
            style={styles.modal} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card disabled={false} header={Header}>
                {props.item.get('currentItem').get('hasRead') == 0 &&
                    <TouchableOpacity style={styles.item} onPress={markRead}>
                        <Text category="s1">标记为已读</Text>
                    </TouchableOpacity>
                }

                {props.item.get('currentItem').get('hasRead') == 1 &&
                    <TouchableOpacity style={styles.item} onPress={markUnRead}>
                        <Text category="s1">标记为未读</Text>
                    </TouchableOpacity>
                }

                {/* <TouchableOpacity style={styles.item}>
                    <Text category="s1">上面全部标记为已读</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text category="s1">下面全部标记为已读</Text>
                </TouchableOpacity> */}
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
    const { item } = state
    return { item }
};

export default connect(mapStateToProps)(ItemOperateModal);