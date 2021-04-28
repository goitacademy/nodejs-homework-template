const app = require('../app');
const db = require('../model/db');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not started. Error message: ${err.message}`);
  process.exit(1);
});
