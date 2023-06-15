const app = require('./app');

const mongoose = require('mongoose');

const {DB_HOST} = require('./env');

mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000);
}).catch(error => {
  console.log(error.message);
  process.exit(1);
});


// const app = require('./app');

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });