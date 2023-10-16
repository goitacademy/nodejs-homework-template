const mongoose = require('mongoose');

require('dotenv').config({ path: 'ENV_FILENAME' });

const app = require("./app.js");

//  U1XmmpMOEwO9HXnj

const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => 
  {
  app.listen(PORT)
})
.catch(error => {
  console.log(error.message);
  process.exit(1)
});
