
const app = require('./app')

const { PORT = 3000 } = process.env;

const { connectMongo } = require('./src/db/connection');

const start = async () => {
  try {
    await connectMongo()
      .catch(error => {
        console.log(error);
        process.exit(1);
      })

    app.listen(PORT, (error) => {
      if (error) {
        console.error('Error at server Launch:', error)
      };
      console.log("Database connection successful")
    })
  } catch (error) {
    console.error(`Failed to launch application with error ${error.message}`);
  }
}

start();

