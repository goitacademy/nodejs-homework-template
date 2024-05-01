const express = require("express");
// Morgan - middleware do logowania żądań HTTP w aplikacjach Node.js, szczególnie tych opartych na Express.js
const morgan = require("morgan");
// CORS - mechanizm, który umożliwia przeglądarkom internetowym wykonywanie żądań AJAX do innych domen niż ta, z której pochodzi strona internetowa. Bez CORS przeglądarki blokują takie żądania ze względów bezpieczeństwa. Middleware CORS w Express.js pozwala na konfigurację zasad dostępu do zasobów między różnymi domenami
const cors = require("cors");



// Tworzę nową instancję aplikacji Express.js (framework do tworzenia serwerów webowych w JavaScript). 'app' to obiekt, który reprezentuje aplikację, dzięki niemu mogę definiować routy albo obsługiwać żądania HTTP
const app = express();

// funkcje middleware
// parsuje dane przesyłane w formacie JSON w ciele żądania i umieszcza je w req.body
app.use(express.json());

// loguje informacje o żądaniach (adres URL, status HTTP) w konsoli. Tryb 'dev' jest bardziej szczegółowy
app.use(morgan("dev"));
// obsługuje nagłówki CORS (Cross-Origin Resource Sharing), które pozwalają na bezpieczne wykonywanie żądań między różnymi domenami
app.use(cors());

const contactsRouter = require("./routes/api/contacts");
app.use("/api/contacts", contactsRouter);

module.exports = 
  app
;

// template GOIT
// const logger = require('morgan')

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found' })
// })

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })
