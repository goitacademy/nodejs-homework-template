const mongoose = require('mongoose');

const uri = 'mongodb+srv://raffamieczkowski:zlWXMz1wvNW3KItG@cluster0.ipvqhwb.mongodb.net/db-contacts';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options)
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

module.exports = mongoose;
