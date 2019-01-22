import { Document, Schema, model } from 'mongoose'


export enum ISPlaylistVisibility {

    private,
    publc

}

export interface ISPlaylist extends Document {

    user_id: string,
    yt_id: string[],
    visibility: ISPlaylistVisibility,
    playlist_name: string

}




const slyPlaylistScheme = new Schema({

    user_id: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    yt_id: {
        required: true,
        type: [String],
        default: []
    },

    visibility: {
        required: true,
        type: Number,
        default: 0
    },
    playlist_name: {
        required: true,
        type: String
    }


})


const SlyPlaylistModel = model('SlyPlaylist', slyPlaylistScheme);

export default SlyPlaylistModel;