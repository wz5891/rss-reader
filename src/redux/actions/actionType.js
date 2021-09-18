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

        refreshPending: `CHANNEL_REFRESH${ActionType.Pending}`,
        refreshFulfilled: `CHANNEL_REFRESH${ActionType.Fulfilled}`,
        refreshRejected: `CHANNEL_REFRESH${ActionType.Rejected}`,


        pageQueryPending: `CHANNEL_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `CHANNEL_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `CHANNEL_PAGEQUERY${ActionType.Rejected}`,



        fetchAllChannelPending: `CHANNEL_FETCH_ALL${ActionType.Pending}`,
        fetchAllChannelFulfilled: `CHANNEL_FETCH_ALL${ActionType.Fulfilled}`,
        fetchAllChannelRejected: `CHANNEL_FETCH_ALL${ActionType.Rejected}`,


        setOperateModalVisble: 'SET_CHANNEL_OPERATE_MODAL_VISBLE',
    },
    item: {
        setItemList: 'SET_ITEM_LIST',
        setCurrentItemlId: 'SET_CURRENT_ITEM_ID',
        setCurrentItem: 'SET_CURRENT_ITEM',

        refreshPending: `ITEM_REFRESH${ActionType.Pending}`,
        refreshFulfilled: `ITEM_REFRESH${ActionType.Fulfilled}`,
        refreshRejected: `ITEM_REFRESH${ActionType.Rejected}`,

        pageQueryPending: `ITEM_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `ITEM_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `ITEM_PAGEQUERY${ActionType.Rejected}`,


        markAllUnRead: 'ITEM_MARK_ALL_UNREADER',
        markAllRead: 'ITEM_MARK_ALL_READER',
        markItemUnRead: 'ITEM_MARK_ITEM_UNREAD',
        markItemRead: 'ITEM_MARK_ITEM_READ',

        markItemUnFavorite: 'ITEM_MARK_ITEM_UN_FAVORITE',
        markItemFavorite: 'ITEM_MARK_ITEM_FAVORITE',

        setOperateModalVisble: 'SET_ITEM_OPERATE_MODAL_VISBLE',

        fetchAndSaveRssItemPending: `ITEM_FETCH_AND_SAVE_RSS${ActionType.Pending}`,
        fetchAndSaveRssItemFulfilled: `ITEM_FETCH_AND_SAVE_RSS${ActionType.Fulfilled}`,
        fetchAndSaveRssItemRejected: `ITEM_FETCH_AND_SAVE_RSS${ActionType.Rejected}`,

        setSingleChannelMenuVisble: 'SET_SINGLE_CHANNEL_MENU_VISBLE',
    },
    favorite: {
        refreshPrepare: 'FAVORITE_REFRESH_PREPARE',
        pageQueryPending: `FAVORITE_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `FAVORITE_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `FAVORITE_PAGEQUERY${ActionType.Rejected}`,
    },

}