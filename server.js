const app = require('./app');
const dotenv=require('dotenv');
const logger = require('morgan');
const mongoose = require('mongoose');

dotenv.config({path:'./.env'});

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))

mongoose.connect(process.env.MONGO_URL).then((con)=>{
  console.log ('Database connection successful')  
}).catch((err)=>{
  console.log(err);
  process.exit(1);
})

app.listen(process.env.PORT, () => {
  console.log(`Server running. Use our API on port: ${process.env.PORT}`)
})


  