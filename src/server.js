const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(
    `Server running. Use our API on port: ${PORT} http://localhost:${PORT}`
  );
});
