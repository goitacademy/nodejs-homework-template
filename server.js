const app = require('./app');

// Set application running PORT
const port = 3000;
// Launch server
app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
