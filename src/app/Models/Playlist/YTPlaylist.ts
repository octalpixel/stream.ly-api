/// A Place Holder Data Store without need to parse the playlist multiple times


import { Schema, model } from 'mongoose'


export interface IYTPlaylist {

}

export interface IYTPlaylistItem {
    title: string,
    video_id: string,
    thumbnail: string
}



const ytPlaylistSchema = new Schema({


    playlist_id: {
        type: String,
        required: true
    },
    playlist_item: {
        required: true,
        type: [Object]
    }


})


const YTPlaylist = model('YTPlaylist', ytPlaylistSchema);

export default YTPlaylist