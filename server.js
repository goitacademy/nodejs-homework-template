const app = require('./app');
const { connect } = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port:${PORT}. Database connection successful`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
