const mongoose = require('mongoose');
const app = require('./app');

/*  EventEmitter  */
const { EventEmitter } = require('node:events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('connected', () => {
  console.log(
    'Connection to database has been established. Listening on port 3000'
  );
});

// myEmitter.on('connecting', () => {
//   console.log('Connecting to the database...');
// });

// myEmitter.on('disconnected', () => {
//   console.log('Disconnected from database');
// });

// myEmitter.emit('connected');
// myEmitter.emit('disconnected');
// myEmitter.emit('connecting');
/*  */

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    myEmitter.emit('connected');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
