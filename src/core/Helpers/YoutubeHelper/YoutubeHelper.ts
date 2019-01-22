import SECRET_KEYS from "../../../app/app.secret.config";
import HttpRequest from "../../../app/Services/Common/HttpRequest";

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


export const parsePlaylist = (playlistID: string) => {


    // send request using fetch
    // check if the had results
    // check the number of results in page
    // check in had next page,tokemn
    // if had next page token, get next results

    let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistID}&key=${SECRET_KEYS.YOUTUBE_DATA_API}`

    try {

        let responseData = HttpRequest.get(url)

    } catch (error) {

    }


}
