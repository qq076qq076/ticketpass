import type { EventItem, Pagination } from '@/interface/event';
import api from './api';

export const getEventList = (page = 1, size = 8): Promise<Pagination<EventItem>> => {
    return api.get('').then((res): EventItem[] =>
        res.data.map((event: any): EventItem => ({
            id: event.id,
            title: event.title,
            start: toLocalTime(event.start),
            end: toLocalTime(event.end),
            description: event.description,
            image: import.meta.env.VITE_ASSETS_PATH + event.image,
        }))
    ).then(async (content: EventItem[]): Promise<Pagination<EventItem>> => {
        const contentList = content.slice((page - 1) * size, page * size);
        await delay();
        return {
            page: contentList.length ? page : page - 1,
            totalPages: Math.ceil(content.length / size),
            contentList,
        };
    })
};

export const getEventById = (id: number): Promise<EventItem> => {
    return api.get('').then((res): EventItem[] =>
        res.data.map((event: any): EventItem => ({
            id: event.id,
            title: event.title,
            start: toLocalTime(event.start),
            end: toLocalTime(event.end),
            description: event.description,
            image: import.meta.env.VITE_ASSETS_PATH + event.image,
        }))
    ).then(async (content: EventItem[]): Promise<EventItem> => {
        const event = content.find((eventItem) => eventItem.id === id);
        await delay();
        if (event) {
            return event;
        } else {
            throw new Error('Item not found');
        }
    })
};

const toLocalTime = (time: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    return new Date(time).toLocaleDateString(undefined, options);
}

const delay = () => {
    const time = Math.floor(Math.random() * 2000) + 500;
    console.log('wait', time)
    return new Promise(resolve => setTimeout(resolve, time));
}