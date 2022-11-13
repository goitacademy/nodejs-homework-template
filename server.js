const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const {
  connectMongo,
} = require('./service/connectionMongoose.js');
const contactsRouter = require('./routes/api/contacts.js');
const app = express();
const formatsLogger =
  app.get('env') === 'development'
    ? 'dev'
    : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use('/api/contacts', contactsRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 8082;
const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, err => {
      if (err) {
        console.error(
          'Error at a server launch:',
          err
        );
      }
      console.log(
        `Server running. Use our API on port: ${PORT}`
      );
    });
  } catch (arror) {}
};

start();

module.exports = app;
