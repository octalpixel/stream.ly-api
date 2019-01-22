import * as fetch from 'node-fetch';




class HttpRequestHelper {


    headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }


    public async get(url) {

        let requestOptions = {
            method: 'GET',
            headers: this.headers
        }


        return fetch(url, requestOptions);

    }


}


export default new HttpRequestHelper();