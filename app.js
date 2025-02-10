// 1️⃣ Załaduj zmienne środowiskowe z pliku .env
require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const contactsRouter = require('./routes/api/contacts');

const app = express();

// 2️⃣ Połączenie z MongoDB
const DB_HOST = process.env.MONGO_URI;

if (!DB_HOST) {
  console.error('❌ Brak zmiennej środowiskowej MONGO_URI w pliku .env');
  process.exit(1);
}

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('✅ Database connection successful');

    // 3️⃣ Uruchomienie serwera po połączeniu z MongoDB
    const PORT = process.env.PORT || 3001; // Użyj zmiennej środowiskowej lub domyślnie port 3001
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  });

// 4️⃣ Middleware
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// 5️⃣ Routes
app.use('/api/contacts', contactsRouter);

// 6️⃣ Obsługa błędów
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error('❌ Internal server error:', err); // Dodano logowanie błędu
  res.status(500).json({ message: err.message });
});

module.exports = app;
