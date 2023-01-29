const app = require('./app');
const connectToContactsDB = require('./services/contactsMongoDB');
const { PORT } = process.env;

//MAIN
(async function () {
  const isConnectedToDB = !(await connectToContactsDB());
  if (!isConnectedToDB) process.exit(1);

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
