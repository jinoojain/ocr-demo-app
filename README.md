# OCR Demo App
Simple node/express app to demonstrate OCR

Drag and drop a picture onto a webpage and see the extracted text


## Prerequisites
### Node & NPM
To check if you have node already installed, run this command in your terminal: 
``` 
$ node -v
```
NPM comes included with Node, but to confrim you have npm installed, you can run this command in your terminal:
```
$ npm -v
```
If you do not have Node, you can either:
- use a Node.js version manager such as [NVM](https://nodejs.org/en/)
- download Node directly from its [website](https://nodejs.org/en/)

### Microsoft OCR
Get an API subcription key and base uri from [Microsoft's Computer Vision API](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)
- You will be adding the subscription key and base uri to the `config.js` file in the project
- We will be using only the 'Read text in images' or OCR functionality

## Quickstart for POC
Follow these instructions for a simple Node proof of concept (not a web app/no Express)

### To analyze image from a URL
1. Copy the `v1-ocr.js` file
2. Change the strings for `subscriptionKey`, `uriBase` from your Microsoft API
3. Change the `imageUrl` to the image you would like analyzed
4. run `node v1-ocr.js` in your terminal

### To analyze an image from a local file
1. Copy the `v2-ocr.js` file
2. Change the strings for `subscriptionKey`, `uriBase` from your Microsoft API
3. Change the argument to `readFileSync` for `image_file` using a valid path to a local image
4. run `node v2-ocr.js` in your terminal

## Getting Started with the App 
1. Clone the repository
2. Make an `uploads/` directory at the root of the project and make sure it's writeable
3. Run npm install
4. Update the configs in `config.js`
    - use [dotenv](https://github.com/motdotla/dotenv) to load enviroment variables from .env into your node.js app
5. Run the app with `node app.js`
6. The app will run on port 3000 (localhost:3000)

---------
### Built With
- [Node](https://nodejs.org/en/) - Javascript runtime
- [Express](https://expressjs.com/) - Node.js web app framework
- [Microsoft OCR API]() - for image to text API
- [Pug](https://pugjs.org/api/getting-started.html) - HTML templating engine
- [dotenv] - 

### Author
- Jinoo Jain - Nightingale Security
