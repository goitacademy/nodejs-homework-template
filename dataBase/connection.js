const mongoose = require('mongoose');

const connectContactsDB = async () => {
  mongoose.set('useFindAndModify', false);
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectContactsDB,
};
