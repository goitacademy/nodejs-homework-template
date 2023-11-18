
const express = require('express');
const connectToDatabase = require('./db');
const contactsRouter = require('./routes/api/contacts');

const app = express();
const PORT = process.env.PORT || 3000;


connectToDatabase();

app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
