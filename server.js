import express from 'express';
import connectToDatabase from './db.js';
import contactsRouter from './routes/api/contacts.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectToDatabase();

app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
