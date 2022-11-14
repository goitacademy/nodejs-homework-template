const app = require("./app");
const { connectMongo } = require("./db/conection");

const start = async () => {
	await connectMongo();
};

app.listen(3000, () => {
	start();
	console.log("Server running. Use our API on port: 3000");
});
