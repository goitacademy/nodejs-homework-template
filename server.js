const app = require('./app');
const setupMongoConnection = require('./common/utils/setupMongoConnection');

const PORT = 3000;
setupMongoConnection().then(() =>
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  }),
);