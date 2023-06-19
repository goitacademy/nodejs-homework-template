const mongoose = require('mongoose')

const { DB_HOST } = require('./config.js')

require('colors')

mongoose.connect(DB_HOST).then(()=>{
  app.listen(3000, () =>{console.log(`Database connection successful`.bgGreen.bold.italic)})
}).catch(error => {
  console.log(error.message);
  process.exit(1);
})


const app = require('./app');
const { error } = require('console');

