const express = require('express');
const path = require('path');
const app = express();
const formidable = require('formidable');
const fs = require('fs');

app.use(express.static(__dirname));

app.use('/upload', function (req, res) {
  const form = new formidable.IncomingForm();
  const dirUpload = "uploads/";
  form.uploadDir = dirUpload;

  //Tạo thư mục chứa file upload
  if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
  }

  form.parse(req, async (err, fields, files) => {
    //tên file tạm thời
    const oldpath = files.filetoupload.path; //upload_057f6ec8fe1c25a7b3a954174cfc51dc
    //tên file mới
    const newpath = form.uploadDir + files.filetoupload.name;
    //đổi tên file
    const urlUpload = await new Promise((resolve, reject) => {
      fs.rename(oldpath, newpath, err => {
        if (err) {
          reject("Error..." + err);
        } else {
          // trả về đường dẫn file đã upload lên
          const filePath = path.resolve(__dirname, newpath);
          resolve(filePath);
        }
      });
    })
    console.log(urlUpload);
  });
  res.redirect('/');
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index1.html');
});

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));