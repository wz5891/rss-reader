import React from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import { Layout, Text, Icon, TopNavigation, TopNavigationAction, OverflowMenu, MenuItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { fetchAllChannelRss, setAddChannelModalVisble, setLeftDrawerVisble } from '../../redux/actions/channelAction';

const PlusIcon = (props) => (
    <Icon {...props} name='plus-outline' />
);

const SyncIcon = (props) => {
    return <Icon {...props} name='sync-outline' />
}

const MenuIcon = (props) => {
    return <Icon {...props} name='menu-outline' />
}

const ChannelListHeader = (props) => {
    const animationValue = React.useRef(new Animated.Value(0)).current;

    let animated = null;
    const startAnimate = () => {
        if (animated) {
            animated.stop();
        }
        animationValue.setValue(0);
        animated = Animated.loop(Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.in,
            useNativeDriver: true,
        }));
        animated.start();
    };

    React.useEffect(() => {
        return () => {
            if (animated != null) {
                animated.stop();
            }
        }
    }, []);

    let rotateZ = animationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const renderLeftActions = () => (
        <React.Fragment>
            <TopNavigationAction icon={MenuIcon} onPress={() => {
                let leftDrawerVisble = props.channel.get('leftDrawerVisble');
                props.dispatch(setLeftDrawerVisble(!leftDrawerVisble));
            }} />
        </React.Fragment>
    );


    const renderRightActions = () => (
        <React.Fragment>
            {
                props.channel.get('fetchAll').get('loading') == true &&
                <Animated.View
                    style={{
                        transform: [{ rotateZ: rotateZ }],
                    }}>
                    <TopNavigationAction icon={SyncIcon} />
                </Animated.View>
            }
            {
                props.channel.get('fetchAll').get('loading') == false &&
                <TopNavigationAction icon={SyncIcon} onPress={() => {
                    startAnimate();
                    props.dispatch(fetchAllChannelRss(props.channel.get('pageQuery').get('pageSize')));
                }} />
            }

            <TopNavigationAction icon={PlusIcon} onPress={() => {
                props.dispatch(setAddChannelModalVisble(true));
            }} />

            <TopNavigationAction icon={MenuIcon} onPress={() => {
                let leftDrawerVisble = props.channel.get('leftDrawerVisble');
                props.dispatch(setLeftDrawerVisble(!leftDrawerVisble));
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