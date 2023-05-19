const mongoose = require('mongoose');

const app = require('./app')

const DB_HOST = 'mongodb+srv://CherednikNataliia:uPssv8O4N8JTjvtJ@cluster0.ncfefrx.mongodb.net/contacts_reder?retryWrites=true&w=majority'

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(()=>{
app.listen(3000)
})
.catch(error => {
console.log(error.message);
process.exit(1)
});

///