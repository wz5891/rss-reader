import { actionType } from './actionType';

export function setAddChannelModalVisble(visble) {
    return {
        type: actionType.channel.setAddChannelModalVisble,
        payload: visble
    }
}


export function addChannel(url) {
    return {
        type: actionType.channel.addChannel,
        payload: url
    }
}