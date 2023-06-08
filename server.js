const mongoose = require("mongoose");
const DB_HOST = "mongodb+srv://root:Copy582491@cluster0.lkgpudy.mongodb.net/db-contacts?retryWrites=true&w=majority"
const app = require('./app')


mongoose.connect(DB_HOST).then(()=>{
	app.listen(3000);
	console.log("Database connection successful");
}).catch(error => {
	console.log(error.message);
	process.exit(1);
}) 



