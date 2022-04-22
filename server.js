const app = require('./app');

app.listen(3000, () => {
  console.log('Server running. Use our API on port: 3000');
});

console.log(process.env.NODE_ENV);
