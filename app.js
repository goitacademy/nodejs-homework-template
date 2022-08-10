// const express = require('express')
// const logger = require('morgan')
// const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

// const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
// app.use(express.json())

// app.use('/api/contacts', contactsRouter)

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })

// module.exports = app

const express = require("express");
require("dotenv").config();
const router = require("./routes/router");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(router);

app.listen(PORT, () => console.log(`Server is running on the port ${PORT}...`));
