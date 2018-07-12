const express = require('express');
const app = express()
const fileUpload = require('express-fileupload');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('dropzone'))
app.use(fileUpload());

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, () => console.log('OCR demo app listening on port 3000!'));

app.post('/upload', function(req, res){
  if (!req.files) {
      return res.status(400).send('No files were uploaded');
  }

  let file = req.files.file;
  let fileName = req.files.file.name;

  file.mv('./uploads/'+fileName, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send('File uploaded');
  });
});
