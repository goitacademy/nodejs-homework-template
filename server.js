const app = require('./app')
const mongoose = require('mongoose')

const Db_HOST="mongodb+srv://Vitya:5OiKWi1pOG9oKZ0H@cluster0.srjncdi.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(Db_HOST)
  mongoose.set(`strictQuery`,true)
  .then(() =>
    app.listen(3000, () => console.log(`Database connection successful on PORT :3000`))
  )
.catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
