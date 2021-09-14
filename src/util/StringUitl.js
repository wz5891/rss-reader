export const getFirstImageUrl = function (str) {
    var data = '';
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
        data = capture;
    });
    return data
}

export const cutString = (str, size) => {
    if (!str) {
        return '';
    }

    if (str.length <= size) {
        return str;
    } else {
        return str.substr(0, size) + '...';
    }
}