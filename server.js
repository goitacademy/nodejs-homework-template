const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { MONGO_DB } = process.env;
const PORT = process.env.PORT || 5000;

try {
    mongoose.connect(MONGO_DB).then(() => {
        console.log(`mongoDB connection successful`);
    });
    app.listen(PORT, () => {
        console.log(`server start on port = ${PORT}`);
    });
} catch (error) {
    process.exit(1);
}
