const db = require('../model/db');
const app = require('../app');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server is not running. Error: ${err.message}`);
  process.exit(1);
});
