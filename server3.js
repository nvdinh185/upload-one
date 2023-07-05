const express = require('express');
const path = require('path');
const app = express();
const formidable = require('formidable');
const fs = require('fs');

app.use(express.static(__dirname));

app.post('/upload', function (req, res) {
  const form = new formidable.IncomingForm();
  const dirUpload = "uploads/";
  form.uploadDir = dirUpload;

  //Tạo thư mục chứa file upload
  if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
  }

  form.parse(req, (err, fields, files) => {
    var fileName = files['file'].name;
    // đường dẫn thực file upload lên
    var newPath = `${dirUpload}/${fileName}`;
    var oldPath = files['file'].path;
    // đổi tên file
    fs.renameSync(oldPath, newPath);
    // đường dẫn file đã upload lên
    const filePath = path.resolve(__dirname, newPath);
    console.log(filePath);
  });
  res.redirect('/');
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index2.html');
});

// start server
const port = 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));