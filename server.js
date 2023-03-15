const app = require('./app')

const mongoose = require('mongoose');


const url = 'mongodb+srv://mirzakhanovamari:testcluster@cluster0.icwx1gn.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(url)
  .then(() => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


// const start = async () => {
//   try {
//   await connectMongo();

  // app.listen(3000, () => {
  //   console.log("Server running. Use our API on port: 3000")
//   });
//   } catch (err) {
//     console.error(`Failed to launch apllication with error: ${err.message}`);
//   }


// };

// start();

