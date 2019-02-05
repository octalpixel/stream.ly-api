import KDService from "../../../core/BaseService/KDService";
import SlyPlaylistModel from "../../Models/Playlist/SPlaylist";
import YTPlaylistModel from "../../Models/Playlist/YTPlaylist";
import HttpRequest from "../Common/HttpRequest";
import { log } from "util";



export default class PlaylistService extends KDService {



    constructor() {
        super()
        super.setModel(SlyPlaylistModel)
    }


    getPlaylistID() {

    }


    async isPlaylistAlredyParsed(playlistId) {

        try {
            this.setModel(YTPlaylistModel)

            let results = await this.getOneByCondition({ playlist_id: playlistId });

            if (results.success) {
                if (results.data != null) {
                    return true
                }
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;

        }

    }



    async createPlaylist(playlistName: string) { }

    async addSongToPlaylist(playlist_id: string, yt_id: string) { }

    async removeSongFromPlaylist(playlist_id: string, yt_id: string) { }

    async importYTPlaylist(playlistName: string, playlist_url) {



        try {

            let yt_link = await HttpRequest.get(playlist_url);

            return yt_link;


        } catch (error) {
            console.log(error);
            return null;

        }






    }


}