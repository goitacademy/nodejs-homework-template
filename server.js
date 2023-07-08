const path = require('path');

// const app = require('./app')
const app = require(path.join(__dirname, 'app'));

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
