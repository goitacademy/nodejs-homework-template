const app = require('./app');
const { connectToContactsDB } = require('@root/models/contacts');
const { PORT } = process.env;

//MAIN
(async function () {
  const isConnectedToDB = !(await connectToContactsDB());
  if (!isConnectedToDB) process.exit(1);

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
