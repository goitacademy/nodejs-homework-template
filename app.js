import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// Modyfikacja obsługi ścieżki głównej
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the contacts API!",
    availableEndpoints: [
      {
        method: "GET",
        path: "/api/contacts",
        description: "Get all contacts",
      },
      {
        method: "GET",
        path: "/api/contacts/{id}",
        description: "Get a specific contact by ID",
      },
      {
        method: "POST",
        path: "/api/contacts",
        description: "Add a new contact",
      },
      {
        method: "DELETE",
        path: "/api/contacts/{id}",
        description: "Delete a contact by ID",
      },
      {
        method: "PUT",
        path: "/api/contacts/{id}",
        description: "Update a contact by ID",
      },
    ],
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export { app };
