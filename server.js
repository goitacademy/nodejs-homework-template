const app = require('./app')

const {connectMongo} = require('./db/connection')


const start = async () => {

  await connectMongo();

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  });
};

start()
  // .then(console.log)
  // .catch(console.error)
  // .finally(() => client.close());
