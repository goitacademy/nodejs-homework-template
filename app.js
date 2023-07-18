import express from "express";
import logger from "morgan";
import cors from "cors";

import contactsRouter from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
	res.status(404).json({
		status: "error",
		code: 404,
		message: "Use api on routes: /api/tasks",
		data: "Not found",
	});
});

app.use((e, _, res, __) => {
	const { status = 500, message = "Server error!" } = e;
	res.status(status).json({
		message,
	});
});

export default app;
