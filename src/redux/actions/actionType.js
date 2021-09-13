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


        fetchChannelRss: 'ITEM_FETCH_NEW_ITEM'
    },
    item: {
        setItemList: 'SET_ITEM_LIST',
        setCurrentItemlId: 'SET_CURRENT_ITEM_ID',
        setCurrentItem: 'SET_CURRENT_ITEM',

        refreshPrepare: 'ITEM_REFRESH_PREPARE',
        pageQueryPending: `ITEM_PAGEQUERY${ActionType.Pending}`,
        pageQueryFulfilled: `ITEM_PAGEQUERY${ActionType.Fulfilled}`,
        pageQueryRejected: `ITEM_PAGEQUERY${ActionType.Rejected}`,

    },
    page: {
        pageSearchSetUserWord: 'PAGESEARCH_SETUSERWORD',
        pageSearchSetError: 'PAGESEARCH_SETERROR',
        pageSearchSetLoading: 'PAGESEARCH_SETLOADING',
        pageSearchShowCamera: 'PAGESEARCH_SHOWCAMERA',
        pageSearchSetState: 'PAGESEARCH_SETSTATE',

        pageFavLoadListPending: `PAGEFAV_LOADLIST${ActionType.Pending}`,
        pageFavLoadListFulfilled: `PAGEFAV_LOADLIST${ActionType.Fulfilled}`,
        pageFavLoadListRejected: `PAGEFAV_LOADLIST${ActionType.Rejected}`,

        pageFavDetailSetError: 'PAGEFAVDETAIL_SETERROR',
        pageFavDetailSetLoading: 'PAGEFAVDETAIL_SETLOADING',
        pageFavDetailSetState: 'PAGEFAVDETAIL_SETSTATE',
    }
}