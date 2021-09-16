import React, { useEffect } from 'react';
import { Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Text, Spinner } from '@ui-kitten/components';
import { StyleSheet, Linking } from 'react-native';
import { connect } from 'react-redux';
import { setCurrentItem, markItemFavorite, markItemUnFavorite, markItemRead } from '../redux/actions/itemAction';
import RenderHtml from 'react-native-render-html';
import { ScrollView } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import moment from 'moment';
import * as eva from '@eva-design/eva';

const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' />
);

const StarIcon = (props) => (
    <Icon {...props} name='star' />
);
const StarOutLineIcon = (props) => (
    <Icon {...props} name='star-outline' />
);

const MenuIcon = (props) => (
    <Icon {...props} name='more-vertical' />
);

const BrowerIcon = (props) => (
    <Icon {...props} name='globe' />
);

const LogoutIcon = (props) => (
    <Icon {...props} name='log-out' />
);


const ItemDetailScreen = (props) => {
    const [menuVisible, setMenuVisible] = React.useState(false);

    useEffect(() => {
        let currentItemId = props.item.get('currentItemId');
        props.dispatch(setCurrentItem(currentItemId));

        props.dispatch(markItemRead(currentItemId));
    }, [])


    const favoriteItem = () => {
        let currentItemId = props.item.get('currentItemId');
        props.dispatch(markItemFavorite(currentItemId));
    }

    const unFavoriteItem = () => {
        let currentItemId = props.item.get('currentItemId');
        props.dispatch(markItemUnFavorite(currentItemId));
    }

    const openBrowser = () => {
        let currentItem = props.item.get('currentItem');

        var link = currentItem.get('link');

        Linking.canOpenURL(link).then(supported => {
            if (!supported) {
                alert('Can\'t handle url: ' + link);
            } else {
                return Linking.openURL(link);
            }
        }).catch(err => alert('An error occurred', link));
    }


    const renderRightActions = () => {
        let currentItem = props.item.get('currentItem');
        return <React.Fragment>
            <TopNavigationAction icon={BrowerIcon} onPress={openBrowser} />

            {(currentItem.get('hasFavorite') == 0 || currentItem.get('hasFavorite') == null) &&
                <TopNavigationAction icon={StarOutLineIcon} onPress={favoriteItem} />
            }

            {currentItem.get('hasFavorite') == 1 &&
                <TopNavigationAction icon={StarIcon} onPress={unFavoriteItem} />
            }
        </React.Fragment>
    }

    const renderBackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={() => {
            props.navigation.goBack();
        }} />
    );

    const { width } = useWindowDimensions();

    const formatePublishedTime = (publishedTime) => {
        if (publishedTime) {
            return moment(publishedTime).format('yyyy-MM-DD HH:mm:ss');
        } else {
            return '';
        }
    }

    let tagsStyles = {
        body: {
            whiteSpace: 'normal',
            lineHeight: '1.5em'
        }
    };
    if (props.setting.get('isNight')) {
        tagsStyles = {
            body: {
                whiteSpace: 'normal',
                color: 'white',
                lineHeight: '1.5em'
            }
        }
    }


    return (
        <Layout style={styles.container} level='1'>
            <TopNavigation
                alignment='center'
                title=''
                subtitle=''
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />


            {!props.item.get('currentItem').get('id') &&
                <Layout style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Spinner />
                </Layout>
            }

            {props.item.get('currentItem').get('id') &&
                <ScrollView style={{
                    padding: 10
                }}>
                    <Layout style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                        <Text category="p2">{props.channel.get('currentChannel').get('title')}</Text>

                        <Text category="p2">{formatePublishedTime(props.item.get('currentItem').get('publishedTime'))}</Text>
                    </Layout>
                    <Text category="h5">{props.item.get('currentItem').get('title')}</Text>
                    <RenderHtml
                        contentWidth={width}
                        source={{
                            html: props.item.get('currentItem').get('content')
                        }}
                        ignoredDomTags={['iframe']}
                        defaultTextProps={{
                            selectable: true,
                        }}
                        tagsStyles={tagsStyles}
                    />
                </ScrollView>
            }
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 20
    },
});


const mapStateToProps = (state) => {
    const { item, channel, setting } = state
    return { item, channel, setting }
};

export default connect(mapStateToProps)(ItemDetailScreen);
