const mongoose = require('mongoose');

const connectMongo = async () => {
  return await mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = {connectMongo};
