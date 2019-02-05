import KDController from "../../../core/BaseController/KDController";
import { Request, Response, NextFunction } from 'express'
import { parsePlaylist } from "../../../core/Helpers/YoutubeHelper/YoutubeHelper";

class PlaylistController {



    constructor() {

    }


    async importYTPlaylist(req: Request, res: Response, next: NextFunction) {

        //get the playlist link 
        // check if the playlist already parse, 
        // if not parse, thte  parse playlist
        // add the playlist to the model
        // create SPlaylist
        // return confirmation


        // let url: string = req.body.url

        // if (url == undefined || url.length >= 0) {

        // }

        let data = await parsePlaylist('PL6j62WXKkENq1pM1vqv1P9abb99ttMiIZ')

        return res.json({ data: data, dataCount: data.length })

    }



}

export default new PlaylistController();