const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan')
const {colors} = require('./helpers')
const app = express();
const connectDB = require('./config/db')

 dotenv.config({path:'./config/.env'});

 const {PORT} = process.env;

 const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
  // Logger
  app.use(logger(formatsLogger))
  
 // Parse Json
 app.use(express.json())

 // Connect data-base
 connectDB();

 // routes
 const contacts = require('./routes/contactsRouts');
 app.use('/api/contacts', contacts);

 // page not found
 app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
const server = app.listen(PORT, () => {
console.log(`Server running. Use our API on port: ${PORT}` .red )
})

process.on('unhandledRejection',(error, _) => {
    if(error) {
        console.log(`Error: ${error.message}`)
        server.close(() => process.exit(1))
    }
})