const app = require('./app');

require('colors');

const {PORT} = process.env;
app.listen(PORT, () => {
  // console.log("Server is running on port 3000");
  console.log(`Server running. Use our API on port ${PORT}`.blue.italic.bold);
})