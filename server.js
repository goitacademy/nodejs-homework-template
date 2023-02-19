const app = require("./app");
const { mongooseConection } = require("./src/db/conections");
require('dotenv').config()

const startBackend = async () => {
	try {
		await mongooseConection();
		app.listen(process.env.PORT, () => {
			console.log("Server running. Use our API on port: 3000");
		});
	} catch (error) {
		console.error(`faild to launch application with error: ${error.message}`);
	}
};

startBackend();
