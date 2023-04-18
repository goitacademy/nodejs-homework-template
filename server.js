const app = require('./app');

app.listen(3000, () => {
  console.log(
    'Server running. Use our API link http://localhost:3000/api/contacts/ on port: 3000'
  );
});
