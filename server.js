const app = require("./app");
const {connectMongo}= require("./db/connections");
const { DB_HOST, PORT = 5500 } = process.env;


const main = async() => {
    try{
        await connectMongo(DB_HOST);
        console.log("Database connection successful");
             app.listen(PORT, (err) => {
              if(err) console.log("Error at aserver launch:", err);
             console.log(`Server running. Use our API on port", ${PORT}`); 
             });
         } catch (error) {
            console.log(`Failed to launch applicatin with error ${err.message}`);
             process.exit(1);
         }
     };


main();