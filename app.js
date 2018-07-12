const express = require('express');
const app = express()
const fileUpload = require('express-fileupload');
const request = require('request');
var fs = require('fs');

// Microsoft OCR info
const subscriptionKey = 'df57b75cfc1240f9b23236afe29d9337';
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/ocr';

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('dropzone'))
app.use(fileUpload());

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, () => console.log('OCR demo app listening on port 3000!'));

// function to upload picture file to the /uploads directory
var upload = function (req, res, next) {
  if (!req.files) {
      return res.status(400).send('No files were uploaded');
  }

  let file = req.files.file;
  let fileName = req.files.file.name;

  file.mv('./uploads/'+fileName, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log('File uploaded');
    next()
  });
}

// function to run the picture through OCR
var ocr = function (req, res, next) {
  image_filename = './uploads/' + req.files.file.name;
  image_file = fs.readFileSync(image_filename);

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
      console.log(error);
      return res.status(500).send(err);
    }

    let jsonResponse = JSON.stringify(JSON.parse(body)); //, null, '  ');
    console.log('jsonResponse:\n' + jsonResponse);
   
   /*
    var stringOCR = '';
    
    if (jsonResponse != null && jsonResponse.regions != null) {
      console.log('cp 1');
      for (var item in jsonResponse.regions) {
        console.log('cp 2');
        for (var line in item.lines) {
          console.log('cp 3');
          for (var word in line.words) {
            console.log('cp 4 - adding to stringOCR');
            stringOCR += word.text;
            stringOCR += ' ';
          }
          stringOCR += '\n';
        }
        stringOCR += '\n';
      }
    }

    console.log('string OCR: ' + stringOCR);

    let responseString = JSON.stringify(jsonResponse);

    */
    res.send(jsonResponse);
  });
}

// TODO: pull all the words out of the json response
// TODO: concatenate words in some meaningful way

app.post('/upload', [upload, ocr]);
