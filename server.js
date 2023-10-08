const app = require("./app");

const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const { DB_HOST, PORT = 300 } = process.env;
mongoose.connect(DB_HOST).then(()=>
app.listen(PORT, () => {
   console.log("Server running. Use our API on port: 300");
})
).catch(error =>{  
console.log(error)
process.exit(1)
})




