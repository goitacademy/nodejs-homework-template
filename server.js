import app from './app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://Stefan:neptun25@cluster0.hcinref.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1);
});
db.once('open', () => {
  console.log('Database connection successful');

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});
