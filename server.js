const app = require('./app');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });


app.listen(process.env.PORT || 4000, () => {
  console.log("Server running. Use our API on port: 3000")
})
