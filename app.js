import express from "express";
import logger from "morgan";
import cors from "cors";
import multer from "multer";
import { uploadAvatar } from "./routes/api/users.js";
import contactsRouter from "./routes/api/contacts.js";
import usersRouter from "./routes/api/users.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static("public/avatars"));

app.patch(
	"/users/avatars",
	authenticateUser,
	upload.single("avatar"),
	uploadAvatar
);

app.use("/api/contacts", authenticateUser, contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});

export { app };
