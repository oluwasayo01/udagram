# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.


### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`


### Elasticbeanstalk url (EB_URL):
- http://udagram-dev-oluwasayo.us-east-1.elasticbeanstalk.com/

The endpoint can be tested by sending a `GET` request to:
```
http://udagram-dev-oluwasayo.us-east-1.elasticbeanstalk.com/filteredImage?image_url={image_url}
```
where `image_url` is a query parameter that indicates the url of the publicly available image.
