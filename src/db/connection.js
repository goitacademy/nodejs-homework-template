const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

async function connectMongo() {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }); 
     
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error while connection to Database');
    process.exit(1);
  } 
}

module.exports = {
connectMongo
}