const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Asegúrate de que tienes importada la variable contactRoutes desde donde sea que esté definida
const contactRoutes = require('./routes/contacts'); // Reemplaza con la ruta correcta

app.use("/api/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

