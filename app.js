const express = require('express');
const app = express()
const fileUpload = require('express-fileupload');
const request = require('request');
var config = require('./config');
var fs = require('fs');

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
      uri: config.uriBase,
      qs: params,
      body: image_file,
      headers: {
          'Content-Type': 'application/octet-stream',
          'Ocp-Apim-Subscription-Key' : config.subscriptionKey
      }
  };

  request.post(options, (error, response, body) => {
    if (error) {
      console.log(error);
      return res.status(500).send(err);
    }

    let jsonResponse = JSON.stringify(JSON.parse(body)); //, null, '  ');
    console.log('jsonResponse:\n' + jsonResponse);

    var results = JSON.parse(body);

    var resultString = '';

    if (results != null && results.regions != null) {
      console.log('chkpnt 1');

      for (var i=0; i < results.regions.length; ++i) {
        console.log('chkpnt 2');

        for (var j=0; j<results.regions[i].lines.length; ++j){
          console.log('chkpnt 3');

          for (var k=0; k<results.regions[i].lines[j].words.length; ++k){
            console.log('chkpnt 4');
            let word = results.regions[i].lines[j].words[k];
            resultString += word.text;
            resultString += ' ';
          }
          resultString += '\n'
        }
        resultString += '\n'
      }
    }

    console.log('Result String: ' + resultString);

    res.send(resultString);
  });
}


app.post('/upload', [upload, ocr]);
