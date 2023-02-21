const app = require("./app");
const dbConnect = require("./config/db");
const { PORT = 3001 } = process.env;

dbConnect();
app.listen(PORT, () => {
  console.log(`Server running. Use our AP I on port: ${PORT}`);
});
