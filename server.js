const { connect } = require('mongoose');

const app = require('./app');
const { mongoUrl } = require('./config');

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");

  connect(mongoUrl, { dbName: "db-contacts" })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.log(err.message)); 
})


