const app = require('./app')

app.listen(3000, (err) => {
    if (err) {
        console.error('Error at server launch:', err);
    }
    console.log("Server running. Use our API on port: 3000")
})
