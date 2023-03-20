const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './.env'})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`)
})

