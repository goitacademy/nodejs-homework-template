const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactRoutes = require('./routes/api/contacts');

app.use('/api/contacts', contactRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    res.status(403).json({ message: 'Error de CORS: No permitido por política de CORS' });
  } else {
    console.error('Error en la aplicación:', err.message);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

module.exports = app;
