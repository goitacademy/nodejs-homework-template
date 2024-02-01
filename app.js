import express from "express";
import dotenv from "dotenv";
import contactsRouter from "#routes/api/contacts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Serwer działa. Używaj API na porcie: ${PORT}`);
});

export default app;
