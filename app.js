import express from 'express';
const app = express();
import logger from "morgan";
import cors from 'cors';
import contactsRouter from './routes/API/contacts/index.js';

const formatsLogger = app.get('env') ===  'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); //from JSON

app.use('/api/contacts', contactsRouter);

app.use((req, res) =>{
    res.status(404).json({message: 'bed request no found'})
});

app.use((err, _req, res, _next) =>{
    res.status(500).json({message: err.message})
});

export default app;