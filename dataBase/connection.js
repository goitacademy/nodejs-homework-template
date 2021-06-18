const mongoose = require('mongoose');

const connectContactsDB = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectContactsDB,
};
