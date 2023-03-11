const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = require("./app");

app.listen(process.env.PORT, () => {
	console.log(`Server running. Use our API on port: ${process.env.PORT}`);
});
