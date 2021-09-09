import { fetchAndSaveRss, fetchRss, getChannelById, pageListFromDb, saveChannelToDb } from '../../api/channel';
import { saveItemToDb } from '../../api/item';
import { actionType } from '../actions/actionType';

export function setAddChannelModalVisble(visble) {
    return {
        type: actionType.channel.setAddChannelModalVisble,
        payload: visble
    }
}


export function addChannel(url) {
    return function (dispatch) {
        saveChannel(url, dispatch).then(() => {
        });
    }
}

export function pageQueryChannel(page, size) {
    return function (dispatch) {
        pageListFromDb(page, size).then(list => {
            dispatch({
                type: actionType.channel.setChannelList,
                payload: list
            });
        });
    }
}

export function setCurrentChannelId(channelId) {
    return {
        type: actionType.channel.setCurrentChannelId,
        payload: channelId
    };
}

export function setCurrentChannel(channelId) {
    return function (dispatch) {
        getChannelById(channelId).then(data => {
            dispatch({
                type: actionType.channel.setCurrentChannel,
                payload: data
            })
        });
    }
}


const saveChannel = async (url, dispatch) => {
    let rss = await fetchRss(url);
    let channelId = await saveChannelToDb(rss);

    if (rss.items && rss.items.length > 0) {
        for (let i = 0; i < rss.items.length; i++) {
            let item = rss.items[i];
            console.log('开始保存item...');

            await saveItemToDb({
                channelId: channelId,
                title: item.title,
                link: item.links[0].url,
                description: item.description,
                lastUpdated: item.published,
                content: item.content
            });
        }

    }

    let list = await pageListFromDb(1, 10);

    dispatch({
        type: actionType.channel.setChannelList,
        payload: list
    });
}

