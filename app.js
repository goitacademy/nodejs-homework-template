const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require("dotenv");
const path = require("path");
const configPath = path.join(__dirname, ".", ".env");
dotenv.config({ path: configPath });


const contactsRouter = require("./backend/routes/api/contacts")
const userRouter = require("./backend/routes/api/users")

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', userRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;