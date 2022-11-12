const mongoose = require("mongoose");

connectMongo().catch((err) => console.log(err));

async function connectMongo() {
 return mongoose.connect(process.env.MONGO_UGL, {
  useNewUrlParser: true,
  // useUnifidTopology: true
 });
}

module.exports = {
 connectMongo,
};
