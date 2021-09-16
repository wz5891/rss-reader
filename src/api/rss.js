import * as rssParser from 'react-native-rss-parser';

export const fetchRss = async (link) => {

    let response = await fetch(link);
    let text = await response.text();

    let rss = await rssParser.parse(text);

    let title = rss.title;

    let description = rss.description;
    let lastUpdated = rss.lastUpdated;
    let items = rss.items;


    return {
        title, link, description, lastUpdated, items
    };
}
