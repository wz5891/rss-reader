import * as rssParser from 'react-native-rss-parser';
import axios from 'axios';

export const fetchRss = async (link) => {
    let response = await axios.get(link);
    let text = response.data;

    let rss = await rssParser.parse(text);

    let title = rss.title;

    let description = rss.description;
    let lastUpdated = rss.lastUpdated;
    let items = rss.items;


    return {
        title, link, description, lastUpdated, items
    };
}
