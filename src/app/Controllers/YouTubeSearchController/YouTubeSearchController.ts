import KDController from "../../../core/BaseController/KDController";
import searchYoutube from 'youtube-api-v3-search';
import { IYoutubeAPIResponse } from "../../Models/Interfaces/YouTubeAPISearchResult";

import SECRET_KEYS from '../../app.secret.config';

import { Request, Response, NextFunction } from 'express'
import ResponseHelper from "../../../core/Helpers/ResponseHelper";
import APP_MESSAGES from "../../app.message.config";


interface YTSearchParams {
    q: string,
    maxResults: string,
    type: string
}

interface YTSearchResponse {
    title: string,
    videoId: string,
    thumbnail: string
}


export class YouTubeSearchController {

    private ControllerMessages = APP_MESSAGES.YouTubeSearchController

    constructor() {
        this.search = this.search.bind(this);
    }

    private async searchYT(searchQuery) {


        try {

            let searchParams: YTSearchParams = {
                q: searchQuery,
                maxResults: '25',
                type: 'video'
            }

            let searchResults: IYoutubeAPIResponse = await searchYoutube(SECRET_KEYS.YOUTUBE_DATA_API, searchParams)

            let resultItems = searchResults.items

            let youtubeResults: YTSearchResponse[] = resultItems.map(result => {

                let snippetData = result.snippet
                let idDetails = result.id

                let response = {
                    title: snippetData.title || "",
                    videoId: idDetails.videoId || "",
                    thumbnail: snippetData.thumbnails.high.url || "",
                    profile: snippetData.channelTitle || ""
                }

                return response


            })


            return youtubeResults

        } catch (error) {
            console.log(error);
            return []

        }

    }



    /**
     * Start of Controllers
     */

    async search(req: Request, res: Response, next: NextFunction) {


        try {
            let searchQuery = req.body.query

            if (searchQuery == null || searchQuery == undefined) {

                return ResponseHelper.requestFailedResponse(this.ControllerMessages.queryNotSpecified, res);
            }

            let youtubeResults = await this.searchYT(searchQuery)

            if (youtubeResults.length <= 0) {

                return ResponseHelper.requestFailedResponse(`${this.ControllerMessages.noResultsFound} - ${searchQuery}`, res)

            }


            return ResponseHelper.requestSuccessResponse(youtubeResults, res);


        } catch (error) {

            console.log(error);

            return ResponseHelper.requestFailedResponse(this.ControllerMessages.errorInSearchController, res)


        }


    }


}


const YTSearchController = new YouTubeSearchController()

export default YTSearchController;