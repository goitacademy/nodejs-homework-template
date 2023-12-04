const mongoose = require('mongoose');

const NODE_ENV = process.env.NODE_ENV;

const dbConnect = async () => {
  try {
    const DB_URI = NODE_ENV === 'test' ? process.env.DB_URI_TEST : process.env.DB_URI;
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('**** CONEXION CORRECTA ****');
  } catch (error) {
    console.error('**** ERROR DE CONEXION ****', error);
  }
};

module.exports = dbConnect;
