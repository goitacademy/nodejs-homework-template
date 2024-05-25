const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const contactsRoutes = require("./routes/contactsRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/contacts", contactsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
