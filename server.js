import mongoose from "mongoose";

import app from "./app.js";
// ndD2DO6jbAW6K90S

const DB_HOST =
	"mongodb+srv://Iuliia-Tyndyk:ndD2DO6jbAW6K90S@cluster0.yx1qcvt.mongodb.net/my-contacts?retryWrites=true&w=majority";
mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(3000, () => {
			console.log("Server running. Use our API on port: 3000");
		});
	})
	.catch((error) => console.log(error.message));
