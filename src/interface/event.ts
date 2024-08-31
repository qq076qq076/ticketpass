export interface EventItem {
    id: number,
    title: string,
    start: string,
    end: string,
    description: string,
    image: string,
}

export interface Pagination<T> {
    page: number;
    totalPages: number;
    contentList: T[];
}