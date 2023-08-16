const app = require('./app');
const mongoose = require('mongoose');

const connection = mongoose.connect(`mongodb+srv://shapoval1044:k0aACBvF5cLneSkt@homedb.ctlcjak.mongodb.net/db-contacts`)

connection
  .then(() => {
    app.listen(3000, function () {
      console.log(`Database connection successful`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
    }
  )
