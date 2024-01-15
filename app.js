import express from 'express';
import logger from 'morgan';
import cors from 'cors';

import { router } from './routes/api/contacts.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

export { app };

router.get('/', (req, res) => {
  return res.json({data:users})
})

router.get('/:id', (req, res) => {
  return res.json({ data: users.find((user) => user.id ===req.params.id)})
})

router.post('/', (req, res) => {
  users.push({
    name: req.body.name,
    email:req.body.email,
    phone:req.body.phone,
  })
})

router.delete('id', () =>{

})

router.put('id', () =>{
  
})