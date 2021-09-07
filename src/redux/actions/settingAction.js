import { actionType } from './actionType';

export function setLanguage(lang) {
    return {
        type: actionType.setting.setLanguage,
        payload: lang
    }
}

export function setTheme(theme) {
    return {
        type: actionType.setting.setTheme,
        payload: theme
    }
}

export function setFontSize(fontSize) {
    return {
        type: actionType.setting.setFontSize,
        payload: fontSize
    }
}