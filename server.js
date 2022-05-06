require("dotenv").config();
const app = require('./app');
const mongoose = require('mongoose');

// Database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'contacts'
})
  .then(() => {
    console.log('✅ Database Connection is ready...')
  })
  .catch((err) => {
    console.log('🍒 err', err)
  })

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('💻 Server is running http://localhost:', PORT);
})