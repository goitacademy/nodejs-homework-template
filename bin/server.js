import app from '../app.js';
import dotenv from 'dotenv';
import connection from '../db/connection.js';
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const SALT = process.env.SALT;

const startServer = async () => {
    try {
        await connection();
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    } catch (error) {
        console.log(`Error on server start ${error.message}`);
    }
};

startServer();
