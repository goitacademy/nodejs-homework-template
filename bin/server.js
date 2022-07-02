const app = require('../app');
const { db } = require('../libs');
const { mkdir } = require('fs/promises');

const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    await mkdir(process.env.TEMP_DIR, { recursive: true });
    console.log(`Server running. Use our API on port:${PORT}`);
  });
}).catch(error => {
  console.log(`Server not running. Error: ${error.message}`);
});
