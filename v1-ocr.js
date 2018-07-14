'use strict';

const request = require('request');
//var fs = require('fs');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'df57b75cfc1240f9b23236afe29d9337';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

const imageUrl = 'https://static1.squarespace.com/static/56afa81cb654f96eea72642f/t/58408b85ebbd1a12d4fecc65/1495805124872/PD+Car?format=500w'; 

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

// OCR post request options
const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

// sending request to Microsoft
request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
