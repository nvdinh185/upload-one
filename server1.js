const express = require('express');
const path = require('path');
const app = express();
const formidable = require('formidable');
const fs = require('fs');

app.use(express.static(__dirname));

app.use('/upload', function (req, res, next) {
  const form = new formidable.IncomingForm();
  const dirUpload = "uploads/";
  form.uploadDir = dirUpload;

  //Tạo thư mục chứa file upload
  if (!fs.existsSync(dirUpload)) {
    fs.mkdirSync(dirUpload);
  }
  //Chép file đã chọn vào nhưng chưa đổi tên
  form.parse(req, (err, fields, files) => {
    //tên file tạm thời
    const oldpath = files.filetoupload.path; //upload_057f6ec8fe1c25a7b3a954174cfc51dc
    //tên file mới
    const newpath = form.uploadDir + files.filetoupload.name;
    //đổi tên file
    fs.rename(oldpath, newpath, err => {
      if (err) throw err;
      // in ra đường dẫn file đã upload lên
      const filePath = path.resolve(__dirname, newpath);
      console.log(filePath);
    });
  });
  res.send('File uploaded!');
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index1.html'));
});

// start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));