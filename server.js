const app = require('./app');
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server running. Use our API on port: 3000');
});
