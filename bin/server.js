
import app from '../app';
import db from '../lib/db-connection';

const PORT = process.env.PORT || 5000;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running. Use our API on port: ${PORT}`);
  });
}).catch(err => {
  console.log(`Server is not running. Error: ${err.message}`);
});