const app = require('./app')

// MONGO START
const mongoose = require('mongoose')
// mongodb+srv://user:UserPass123@cluster0.luc0jve.mongodb.net/?retryWrites=true&w=majority

const MONGO_URL = 'mongodb+srv://user:UserPass123@cluster0.luc0jve.mongodb.net/db-contacts?retryWrites=true&w=majority'
const MONGO_DB_NAME = 'db-contacts'

const connectMongo = async () => {

    mongoose.set("strictQuery", false);// todo: write more about " DeprecationWarning: Mongoose:


    return mongoose.connect(MONGO_URL)// todo: change to variables

}


const start = async () => {
    await connectMongo();

    app.listen(3000, (err) => {
        if (err) {
            console.error('Error at server launch:', err);
        }
        console.log("Server running. Use our API on port: 3000")
    })
}

start()
    .then(console.log)
    .catch(console.error)
// .finally(() => client.close());


/////
// module.exports = {
//     Contacts
// }

