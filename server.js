const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

// Połączenie z MongoDB przy pomocy Mongoose
mongoose.connect('mongodb+srv://Stefan:neptun25@cluster0.hcinref.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Obsługa błędów podczas połączenia z bazą danych
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1);
});
db.once('open', () => {
  console.log('Database connection successful');
  // Start serwera po nawiązaniu połączenia z bazą danych
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});