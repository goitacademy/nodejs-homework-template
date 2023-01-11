const app = require('./app');
const { Path } = require('./models/contacts.js');

app.listen(3000, () => {
  console.log('Server running. Use our API on port: 3000');
  console.log(Path);
});
