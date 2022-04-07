const app = require('./app');
const db = require('./db/dbMongoose');

const PORT = process.env.PORT || 8081;

db.then(() => {
  app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
}).catch(error => {
  console.error(`Server not running. Error message: ${error.message}`);
  process.exit(1);
});
