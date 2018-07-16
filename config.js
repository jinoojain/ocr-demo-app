require('dotenv').config();
var config = {};

config.subscriptionKey = process.env.KEY;
config.uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

module.exports = config;
