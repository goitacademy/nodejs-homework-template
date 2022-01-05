const mongoose = require('mongoose');
const app = require('../app')

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose.connect(DB_HOST)
  .then(()=>app.listen(PORT, ()=>console.log(`Database successfully connected! Server running on port: ${PORT}`)))
  .catch((error) => {
    console.log(error.message);
    process.exit(1)
  })
