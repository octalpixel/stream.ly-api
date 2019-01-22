export interface IYTPlaylistItemResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    prevPageToken?: string
    pageInfo: PageInfo;
    items: Item[];
}

interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
}

interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: ResourceId;
}

interface ResourceId {
    kind: string;
    videoId: string;
}

interface Thumbnails {
    default: Default;
    medium: Default;
    high: Default;
    standard?: Default;
    maxres?: Default;
}

interface Default {
    url: string;
    width: number;
    height: number;
}

interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}