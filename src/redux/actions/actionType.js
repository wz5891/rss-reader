import { ActionType } from 'redux-promise-middleware';

export const actionType = {
    setting: {
        setLanguage: 'SET_LANGUAGE',
        setIsNight: 'SET_ISNIGHT',
        setFontSize: 'SET_FONTSIZE',
    },
    channel: {
        setAddChannelModalVisble: 'SET_ADD_CHANNEL_MODAL_VISBLE',
        addChannel: 'ADD_CHANNEL',
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