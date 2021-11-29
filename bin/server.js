const { app, mongoose } = require('../app');

const { PORT = 3000, DB_HOST } = process.env;

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Database is connected');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

start();
