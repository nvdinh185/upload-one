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

  form.parse(req, async (err, fields, files) => {
    //tên file tạm thời
    const oldPath = files.filetoupload.path; //upload_057f6ec8fe1c25a7b3a954174cfc51dc
    //tên file mới
    const newPath = form.uploadDir + files.filetoupload.name;
    // đổi tên file
    fs.renameSync(oldPath, newPath);
    // đường dẫn file đã upload lên
    const filePath = path.resolve(__dirname, newPath);
    console.log(filePath);
  });
  res.redirect('/');
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index1.html');
});

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));