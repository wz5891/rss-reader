import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Text, Icon, Input, Card, Modal, Button, Spinner } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { addCategory, setAddCategoryModalVisble } from '../redux/actions/categoryAction';
const AddCategoryScreen = (props) => {
    const [title, setTitle] = useState('');

    const LoadingIndicator = () => {
        if (props.category.get('add').get('doing')) {
            return <Spinner size='small' status='control' />;
        } else {
            return null;
        }
    }

    const closeModal = () => {
        props.dispatch(setAddCategoryModalVisble(false));
    }

    const addRss = () => {
        if (!title) {
            alert('分组名称不能为空');
            return;
        }
        props.dispatch(addCategory(title));
    }

    const Header = (props) => (
        <View {...props}>
            <Text category='h6'>新建分组</Text>
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
        <Modal visible={props.category.get('addModalVisble')} style={styles.modal} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <Card disabled={false} header={Header} footer={Footer}>
                <Input
                    size="medium"
                    placeholder='请输入分组名称'
                    value={title}
                    onChangeText={nextValue => setTitle(nextValue)}
                />

                <Text style={{
                    marginTop: 10
                }} status='warning'>{props.category.get('add').get('errorMsg')}</Text>
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
    const { category } = state
    return { category }
};

export default connect(mapStateToProps)(AddCategoryScreen);