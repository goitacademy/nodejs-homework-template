const app = require('./app');
const { connectMongo } = require('./db/contacts');

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, err => {
      if (err) {
        console.error('Error at server launch', err);
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
