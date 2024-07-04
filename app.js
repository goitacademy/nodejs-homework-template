const express = require('express');
const connectDB = require('./db');
const contactsRouter = require('./routes/api/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

