const app = require('./app');

const mongoose = require('mongoose');

const DB_HOST = "mongodb+srv://Bogdan:3xId0DwnHqy03VW3@cluster0.avn2th9.mongodb.net/contacts_read?retryWrites=true&w=majority";
mongoose.connect(DB_HOST)
.then(()=>{console.log('connect succes');
app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
})
.catch(error=>{console.log(error.message);
              process.exit(1)})


