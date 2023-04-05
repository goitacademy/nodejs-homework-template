const app = require("./app");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Vadim:0L65PPQBMMJCeufo@cluster0.gejtlfl.mongodb.net/contacts-db?retryWrites=true&w=majority"
);

// 0L65PPQBMMJCeufo
// mongodb+srv://Vadim:0L65PPQBMMJCeufo@cluster0.gejtlfl.mongodb.net/?retryWrites=true&w=majority

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
