import express from "express"
import logger from "morgan"
import cors from "cors"
import { router as contactsRouter } from "./routes/api/contacts.js"

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())//для перетворення request в req.body

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = 'Server error'} = err;
  res.status(status).json({'message':err.message})
})

// app.listen(3001, ()=>console.log("Server running on port 3001"))

export default app;