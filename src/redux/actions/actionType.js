import { ActionType } from 'redux-promise-middleware';

export const actionType = {
    setting: {
        setLanguage: 'SET_LANGUAGE',
        setIsNight: 'SET_ISNIGHT',
        setFontSize: 'SET_FONTSIZE',
    },
    channel: {
        setAddChannelModalVisble: 'SET_ADD_CHANNEL_MODAL_VISBLE',
        setChannelList: 'SET_CHANNEL_LIST',
        pageQueryChannel: 'PAGE_QUERY_CHANNEL',
        setCurrentChannelId: 'SET_CURRENT_CHANNEL_ID',
        setCurrentChannel: 'SET_CURRENT_CHANNEL'
    },
    item: {
        setItemList: 'SET_ITEM_LIST',
        setCurrentItemlId: 'SET_CURRENT_ITEM_ID',
        setCurrentItem: 'SET_CURRENT_ITEM'
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