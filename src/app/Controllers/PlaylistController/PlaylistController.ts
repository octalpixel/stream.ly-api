import KDController from "../../../core/BaseController/KDController";
import { Request, Response, NextFunction } from 'express'

class PlaylistController extends KDController {



    constructor() {
        super()
    }


    async importYTPlaylist(req: Request, res: Response, next: NextFunction) {

        //get the playlist link 
        // check if the playlist already parse, 
        // if not parse, thte  parse playlist
        // add the playlist to the model
        // create SPlaylist
        // return confirmation


        let url: string = req.body.url

        if (url == undefined || url.length >= 0) {

        }


    }



}