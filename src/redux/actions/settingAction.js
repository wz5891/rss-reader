import { actionType } from './actionType';

export function setLanguage(lang) {
    return {
        type: actionType.setting.setLanguage,
        payload: lang
    }
}

export function setIsNight(isNight) {
    return {
        type: actionType.setting.setIsNight,
        payload: isNight
    }
}

export function setFontSize(fontSize) {
    return {
        type: actionType.setting.setFontSize,
        payload: fontSize
    }
}