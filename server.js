const app = require('./app')

//  hw3------
// IlsjX23NFfPSDFuu
const mongoose = require('mongoose');
const DB_HOST = 'mongodb+srv://Oksanka:IlsjX23NFfPSDFuu@cluster0.xedr9b8.mongodb.net/contacts-reader?retryWrites=true&w=majority';

// mongoose.set("strictQuery", true);
// contacts-reader


mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
});

// mongoose.connect(DB_HOST)
// .then(() => {
//   app.listen(3000, () => {
//     console.log("Database connection successful")
//   })
// })
// .catch(error => {
//   console.log(error.message);
//   process.exit(1);
// });

// --------hw3

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
