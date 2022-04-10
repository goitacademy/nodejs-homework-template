const app = require('./app');

const PORT = process.env.PORT || 3030;
app.listen(PORT, error => {
  if (error) console.error('Error at a server launch', error);
  console.log(`Server running. Use our API on port: ${PORT}`);
});
