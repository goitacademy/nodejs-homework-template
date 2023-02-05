const app = require('./app');
// const mongoose = require('mongoose');

// const PORT = process.env.PORT || 3000;
// const urlDb = process.env.DB_HOST;

// const connection = mongoose.connect(urlDb, {
//   promiseLibrary: global.Promise,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// });

// connection
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port: ${PORT}`);
//     });
//   })
//   .catch(err =>
//     console.log(`Server not running. Error message: ${err.message}`)
//   );

      app.listen(PORT = 3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });