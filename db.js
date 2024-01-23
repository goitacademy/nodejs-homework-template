import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

mongoose.connect(DB_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
console.error('Database connection error:', err);
process.exit(1);
});

db.once('open', () => {
console.log('Database connection successful');
});

export default mongoose;