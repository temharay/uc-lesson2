import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, isValidURL } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get('/filteredimage/', async (req: Request, res: Response) => {
    // if the remote file doesn't exist, the query takes long.
    // so set timeout to one minute.
    res.setTimeout(60000, ()=>{
      return res.status(408).send('Request timed out. Are you sure the image exists')
    });
    const { image_url } = req.query;
    if ( isValidURL(image_url)){
      const localPathFile = await filterImageFromURL(image_url);
      res.sendFile(localPathFile);
      res.on('finish', async () =>{
        // response has finished so lets delete the file now
        await deleteLocalFiles([localPathFile]);
      })
    }else{
      res.status(400).send('invalid url provided');
    }
    

  })

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();