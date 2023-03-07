const express = require('express');
const app = express();
const path = require('path');
const uploadFile = require("./middleware/upload");

global.__basedir = __dirname;

app.use(express.static(__dirname));

app.use('/upload', async function (req, res, next) {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index2.html'));
});

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is starting on port ${port}...`));