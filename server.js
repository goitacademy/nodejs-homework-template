const app = require('./app');
const connectDB = require('./db');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const tmpDir = path.join(__dirname, 'tmp', 'avatars');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

connectDB();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
