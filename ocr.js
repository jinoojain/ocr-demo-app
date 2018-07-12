'use strict';

const request = require('request');
var fs = require('fs');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'df57b75cfc1240f9b23236afe29d9337';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

var image_file = fs.readFileSync('./test_images/test_1.jpeg');

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};


const options = {
    uri: uriBase,
    qs: params,
    body: image_file,
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
