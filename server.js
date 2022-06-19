const app = require('./app');
const mongoose = require('mongoose');
const connecting = mongoose.connect(
 ' mongodb+srv://1q2w3e:1q2w3e@cluster0.myxww8i.mongodb.net/?retryWrites=true',
 {
   db: "contacts",
 }
);
connecting
.then(() => {
app.listen(3000, () => {
  console.log(`Server running. Use our API on port: ${3000}`);
  console.log("Database connection successful");
});
})
.catch((err) => {
  console.log(`Server not started.Error message: ${err.message}`)
  process.exit(1);
});

