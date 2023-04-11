import  app from './app.js';
import mongoose from 'mongoose';
const DB_HOST="mongodb+srv://Andr:vViEen43jESAiZRm@cluster0.e9eyeso.mongodb.net/contacts-reader?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
.then(()=>app.listen(8080, () => {
  console.log("Server running. Use our API on port: 3000")
}))
.catch(error=>console.log(error.message));
// vViEen43jESAiZRm

