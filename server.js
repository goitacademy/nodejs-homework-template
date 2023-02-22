const app = require("./app");
const { connectMongo } = require("./db/connection");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const start = async ()=>{
  await connectMongo()
}


app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
