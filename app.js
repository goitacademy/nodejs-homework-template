const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const uploadDir = path.join(process.cwd(), 'public');
const storeImage = path.join(process.cwd(), 'public/avatars');

require('dotenv').config();
require("./config/passport");

const app = express();
app.use(express.json());
app.use(cors());
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const logger = require('morgan');
app.use(logger(formatsLogger));
const router = require('./api');
app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolder = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder, { recursive: true });
  } else {
    console.log(`Directory already exists: ${folder}`);
  }
};

connection
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server running. Use our API on port: ${PORT}\nDatabase connection successful`);
      createFolder(uploadDir);
      createFolder(storeImage);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  })