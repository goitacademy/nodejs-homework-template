require('dotenv').config();

const app = require('../app');

const { connectContactsDB } = require('../dataBase/connection');

const PORT = process.env.PORT || 3000;

async function startApp() {
  try {
    await connectContactsDB();

    app.listen(PORT, error => {
      if (error) console.error('Error at server launch:', error);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
  }
}

startApp();
