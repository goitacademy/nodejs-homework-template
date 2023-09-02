require('dotenv').config()

require('./db')

const app = require('./app')

const PORT = process.env.PORT || 3000;

app.listen({port: PORT}, () => {
    console.log(`Server started on port ${PORT}`);
});