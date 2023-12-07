const app = require('./app')


const DB_HOST = 'mongodb+srv://Oksana:5SFzOKlEiEsWKvB6@cluster0.bztop9c.mongodb.net/db_contacts?retryWrites=true&w=majority'

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(()=>{
app.listen(3000);
console.log('Database connection successful')
})
.catch(error => {
console.log(error.message);
process.exit(1)
});