import mongoose from 'mongoose'
import { app } from './app.js'

const DB_HOST =
  'mongodb+srv://Denys:nZlqN2oa35ko1QqO@cluster0.83ohyqy.mongodb.net/my-contacts?retryWrites=true&w=majority'

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000, () => console.log(`Database connection successful`)))
  .catch((e) => {
    console.log(e.message)
    process.exit(1)
  })
