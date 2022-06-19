import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import * as fs from "fs";
import * as path from "path";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get("/filteredImage", (req: Request, res: Response) => {
    res.on("finish", () => {
      const localFiles = fs
        .readdirSync(`${__dirname}/util/tmp`)
        .filter((file) => path.extname(file) == ".jpg")
        .map((file) => `${__dirname}/util/tmp/${file}`);
      deleteLocalFiles(localFiles);
    });

    const { image_url } = req.query;

    if (!image_url) {
      return res.status(400).send(`image_url is required`);
    }

    filterImageFromURL(image_url)
      .then((filePath) => {
        return res.status(200).sendFile(filePath);
      })
      .catch((err) => {
        return res
          .status(400)
          .send(`An error occured while processing image at ${image_url}`);
      });
  }); 

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
