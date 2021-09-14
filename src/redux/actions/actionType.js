import { ActionType } from 'redux-promise-middleware';

export const actionType = {
    setting: {
        setLanguage: 'SET_LANGUAGE',
        setIsNight: 'SET_ISNIGHT',
        setFontSize: 'SET_FONTSIZE',
    },
    channel: {
        setAddChannelModalVisble: 'SET_ADD_CHANNEL_MODAL_VISBLE',
        setCurrentChannelId: 'SET_CURRENT_CHANNEL_ID',
        setCurrentChannel: 'SET_CURRENT_CHANNEL',

        addList: 'CHANNEL_ADD_LIST',

        channelAddPending: `CHANNEL_ADD${ActionType.Pending}`,
        channelAddFulfilled: `CHANNEL_ADD${ActionType.Fulfilled}`,
        channelAddRejected: `CHANNEL_ADD${ActionType.Rejected}`,

        refreshPrepare: 'CHANNEL_REFRESH_PREPARE',
        pageQueryPending: `CHANNEL_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `CHANNEL_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `CHANNEL_PAGEQUERY${ActionType.Rejected}`,






    },
    item: {
        setItemList: 'SET_ITEM_LIST',
        setCurrentItemlId: 'SET_CURRENT_ITEM_ID',
        setCurrentItem: 'SET_CURRENT_ITEM',

        refreshPrepare: 'ITEM_REFRESH_PREPARE',
        pageQueryPending: `ITEM_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `ITEM_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `ITEM_PAGEQUERY${ActionType.Rejected}`,


        markAllUnRead: 'ITEM_MARK_ALL_UNREADER',
        markAllRead: 'ITEM_MARK_ALL_READER',
        markItemUnRead: 'ITEM_MARK_ITEM_UNREAD',
        markItemRead: 'ITEM_MARK_ITEM_READ',

        markItemUnFavorite: 'ITEM_MARK_ITEM_UN_FAVORITE',
        markItemFavorite: 'ITEM_MARK_ITEM_FAVORITE',

        setOperateModalVisble: 'SET_OPERATE_MODAL_VISBLE'
    },
    favorite: {
        refreshPrepare: 'FAVORITE_REFRESH_PREPARE',
        pageQueryPending: `FAVORITE_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `FAVORITE_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `FAVORITE_PAGEQUERY${ActionType.Rejected}`,
    },

}