const setupMongoConnection = require('./utils/setupMongoConection');

const setupConnection = async () => {
  try {
    await setupMongoConnection();
  } catch (error) {
    console.log(error)
  }
};

module.exports = setupConnection