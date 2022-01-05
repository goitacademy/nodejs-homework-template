import app from '../app.js';
import db from '../lib/db.js';

const PORT = process.env.PORT || 4000;

db.then(() =>{
    app.listen(PORT, () =>{
        console.log(`app listened port ${PORT}`);
    });
}).catch(err =>{
console.log(`server not runnin. Error: ${err.message}`);
});

