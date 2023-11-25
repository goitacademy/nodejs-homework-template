const app = require('./app');
const mongoose = require("mongoose");
require('dotenv').config();  // Carga las variables de entorno desde .env

const port = process.env.PORT || 3000;  // Utiliza el puerto especificado en .env o el predeterminado 3000

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log("There was an error", error);
    process.exit(1);
  });
