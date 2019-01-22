import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ytdl from 'ytdl-core';
import filenamify from 'filenamify';
import slugify from 'slugify';
import searchYoutube from 'youtube-api-v3-search';
import { IYoutubeAPIResponse } from './app/Models/Interfaces/YouTubeAPISearchResult';
import YTSearchController from './app/Controllers/YouTubeSearchController/YouTubeSearchController';


export default class ExpressApplication {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.configs();
    this.routes();
  }

  cleanFileName(name: string) {

    name = filenamify(name)
    return slugify(name);
  }

  configs() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  routes() {
    this.app.get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        // res.json({success:true, msg:'Connected'});

        // let info  =  await ytdl.getInfo('twl56JMNNjA');
        // console.log(info);

        // res.json(info)
        // return;


        // res.attachment('audiotest.mp3');
        const url = 'https://www.youtube.com/watch?v=twl56JMNNjA';
        // const video = ytdl(url, {
        //   quality: 'highestaudio'
        //   //filter: 'audioonly',
        // });



        let info = await ytdl.getInfo(url);

        let name = info.title

        res.attachment(`${this.cleanFileName(name)}`);

        console.log(this.cleanFileName(name));



        //res.json(info)



        let audioFormats = ytdl.chooseFormat(info.formats, {
          quality: 'highestaudio',
          filter: 'audioonly'
        })

        let formats = JSON.parse(JSON.stringify(audioFormats));
        console.log(formats.clen);

        res.set('Content-Length', formats.clen);
        let container = formats.container || 'm4a'
        res.set('Content-Type', `audio/${container}`);


        const video = ytdl.downloadFromInfo(info, {
          quality: 'highestaudio',
          filter: 'audioonly'
        })







        // console.log(audioFormats);/

        // res.json(audioFormats);

        video.on('finish', () => {
          console.log('This is done');
          res.end();
        });
        video.pipe(res);
      }
    );



    this.app.get('/search', YTSearchController.search);



    // test for communication enginer
    this.app.post('/transportengine', (req, res) => {


      console.log(req.body);

      res.json({
        data: 'Completed :D'
      })



    })

  }

  createServer() {
    return this.app;
  }
}
