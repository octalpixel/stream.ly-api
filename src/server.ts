import ExpressApplication from './ExpressApplication';
import http from 'http';


const port = process.env.PORT || 3000;
const expressApp =  new ExpressApplication();
const server =  http.createServer(expressApp.createServer());


server.listen(port , ()=>{
    console.log(`Server connected at port ${port}`);
})
