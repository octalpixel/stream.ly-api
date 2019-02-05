import SECRET_KEYS from "../../../app/Configs/app.secret.config";
import HttpRequest from "../../../app/Services/Common/HttpRequest";
import { IYTPlaylistItemResponse } from "../../../app/Models/Interfaces/YTPlaylistItemResponseInterface";
import { IYoutubePlaylistExportItems } from "../../../app/Models/Interfaces/YoutubePlaylistItems.interface";



/*
     Help functions for YouTube Link Validation    
 */

export const isValidYTLink = (url: string) => {

    let ytPattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm

    return ytPattern.test(url);

}


export const extractPlaylistID = (url: string) => {


    if (!url.includes('playlist?list')) {
        return ""
    }


    let ytIDPattern = /^(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?.*?(?:v|list)=(.*?)(?:&|$)|^(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?(?:(?!=).)*\/(.*)$/g

    let regexExtract = ytIDPattern.exec(url);

    if (regexExtract == null) {
        return "";
    }

    return regexExtract[1] || "";

}


const getYTPlaylistAPIURL = (playlistID, pageToken?) => {

    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${SECRET_KEYS.YOUTUBE_DATA_API}`

    if (pageToken) {
        url += url + `&pageToken=${pageToken}`
    }

    return url;


}

const getYTPlaylistItems = async (requestData: IYTPlaylistItemResponse) => {

    try {


        let items: IYoutubePlaylistExportItems[] = requestData.items.map(item => {

            let itemSnippets = item.snippet
            const exportItem: IYoutubePlaylistExportItems = {
                title: item.snippet.title,
                thumbnail: (itemSnippets.thumbnails.maxres) ? itemSnippets.thumbnails.maxres.url : itemSnippets.thumbnails.high.url,
                channelTitle: itemSnippets.channelTitle,
                videoId: itemSnippets.resourceId.videoId
            }

            return exportItem;


        })

        return items

    } catch (error) {
        return []
    }

}


const parseYTPlaylistItemRecursively = async (playlistID, token?) => {


    try {

        let url = "";

        if (token) {
            url = getYTPlaylistAPIURL(playlistID, token)
        } else {
            url = getYTPlaylistAPIURL(playlistID)
        }


        let requestData: IYTPlaylistItemResponse = await HttpRequest.get(url);

        console.log(requestData);


        let items = await getYTPlaylistItems(requestData);
        console.log(`This is the items`);
        console.log(items);



        if (requestData.nextPageToken) {
            const token = requestData.nextPageToken
            return [...items, ...(await parseYTPlaylistItemRecursively(playlistID, token))]
        } else {
            return items;
        }


    } catch (error) {
        console.log(error);

        return []
    }


}

export const parsePlaylist = async (playlistID: string) => {


    // send request using fetch
    // check if the had results
    // check the number of results in page
    // check in had next page,tokemn
    // if had next page token, get next results



    try {


        const data = await parseYTPlaylistItemRecursively(playlistID)

        console.log(`This is the data`);

        console.log(data);


        return data



    } catch (error) {
        console.log(error);

        return []
    }


}
