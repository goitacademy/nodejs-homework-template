const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

// MongoDB Connection==========================
mongoose
  .connect(url)
  .then(() => {
    // Port connection
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`);
    });

    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(err.message);

    process.exit(1);
  });
