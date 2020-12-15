# Udagram Image Filtering Microservice Project

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

### Getting Started

run the following command to install libraries

        npm install

### run server

to run the server, issue the following command on your terminal

        npm run dev

### Filtering image

to filter an image, call the api in the following way from your browser or post man:

http://www.url.com/filteredimage?image_url=https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg

image_url must be provided. Note that there is a timeout of 1 minute.