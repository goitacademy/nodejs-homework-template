const mongosse = require("mongosse");
const DB_HOST =
  "mongodb+srv://katerynalubenets:DoAaEeKcpnlzWwXm@cluster0.s4xnwyt.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongosse.set("strictQuery", true);
const app = require("./app");

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
