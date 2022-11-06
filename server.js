const app = require('./app');
const { connectMongo } = require('./src/db/connection');
const PORT = process.env.PORT || 3000;

const runApp = async () => {
  try {
    await connectMongo();
    console.log('Connection successful');
  } catch (error) {
    console.error(`Failed to run app with message ${error.message}`);
    process.exit(1);
  }
  app.listen(PORT, error => {
    if (error) console.error(error.message);
    console.log('Server running. Use our API on port: 3000');
  });
};

runApp();
