const mongoose = require('mongoose')
require('dotenv').config()

// Ustaw adres URL bazy danych
const dbUrl = process.env.DB_HOST // Tutaj podaj własny adres URL

// Utwórz połączenie z bazą danych
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Obsłuż sukces połączenia
const db = mongoose.connection
db.on('connected', () => {
    console.log('Database connection successful')
})

// Obsłuż błąd połączenia
db.on('error', (err) => {
    console.error('Database connection error:', err)
    process.exit(1) // Zakończ proces w przypadku błędu
})

module.exports = db
