const mongoose = require('mongoose');

const app = require('./app');

// Retrieve environment variables
const { DB_HOST, PORT = 3000 } = process.env;

// Enable strict query mode in Mongoose
mongoose.set('strictQuery', true);

// Connect to the MongoDB database
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// This code:

// Requires the necessary modules, including mongoose for database connection and app for the Express application setup.

// Retrieves the environment variables, including the database host (DB_HOST) and the port for the Express server (PORT).

// Sets the strictQuery option in Mongoose to true. This option enforces stricter query validation.

// Attempts to connect to the MongoDB database specified by DB_HOST. If the connection is successful, it logs a success message.

// Starts the Express server on the specified port (PORT). Once the server is started, it logs a message indicating the server is running.

// If there is an error connecting to the database, it logs an error message and exits the process with an exit code of 1.

// This code is typically used to initialize your Express application, connect it to a MongoDB database, and start the server, making it ready to handle incoming requests.
