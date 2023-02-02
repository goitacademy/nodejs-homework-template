const app = require("../app");
const { connectDatabase } = require("../db/connectDatabase");

const { PORT = 3000 } = process.env;

const start = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, (err) =>
      err
        ? console.error("Error at server launch", err.message)
        : console.log(`Server running. Use our API on port: ${PORT}`)
    );
  } catch (err) {
    console.error(`Faied to launch application with error ${err.message}`);
  }
};

start();

// app.listen(PORT, (err) =>
//   err
//     ? console.error("Error at server launch", err.message)
//     : console.log(`Server running. Use our API on port: ${PORT}`)
// );
