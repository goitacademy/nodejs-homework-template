require('dotenv').config({
  path:
    process.env.NODE_ENV === 'production'
      ? './enves/prod.env'
      : './enves/dev.env',
});

const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running. Use our API on port: ${port}`);
});
