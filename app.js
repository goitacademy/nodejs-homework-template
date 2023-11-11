const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Asegúrate de que tienes importada la variable contactRoutes desde donde sea que esté definida
const contactRoutes = require('./routes/api/contacts'); // Reemplaza con la ruta correcta

// Verificar si contactRoutes está definido
if (!contactRoutes) {
  console.error("No se pudo cargar contactRoutes");
  process.exit(1); // Salir de la aplicación en caso de error
}

app.use("/api/contacts", contactRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error("Error en la aplicación:", err.message);
  res.status(500).json({ message: "Error interno del servidor" });
});

module.exports = app;

