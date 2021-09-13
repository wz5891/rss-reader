export const getFirstImageUrl = function (str) {
    var data = '';
    str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
        data = capture;
    });
    return data
}