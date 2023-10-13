const app = require('./app')

const mongoose = require('mongoose');


mongoose.connect(process.env.DB_HOST)
    .then(()=> {console.log("Database connection successful")})
    .catch((error)=>{
        console.log(error.message);
        process.exit(1);
    });

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
