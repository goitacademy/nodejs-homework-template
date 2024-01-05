const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { envsConfig } = require('./configs/index.js');

const routerApi = require('./routes/api/contacts.js');


const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/contacts', routerApi);

app.use((_, res, __) => {
res.status(404).json({
status: 'error',
code: 404,
message: 'Use api on routes: /api/contacts',
data: 'Not found',
});
});

app.use((err, _, res, __) => {
console.log(err.stack);
res.status(500).json({
status: 'fail',
code: 500,
message: err.message,
data: 'Internal Server Error',
});
});

// mongoose
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(envsConfig.dbHost);
connection.then(() => {
  console.log("Database connection successful")
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}.`)
  })
}).catch(err => {
  console.log(`Server not runnung. Error message: ${err.message}.`)
  process.exit(1)
})




