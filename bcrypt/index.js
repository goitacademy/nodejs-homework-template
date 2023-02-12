const bcrypt = require("bcrypt");

async function main() {
    const password = "123456";
    const salt = await  bcrypt.genSalt();
    
    // const salt = "$2b$10$1l4rgAi0iOEVAlI7boYyUuoFeu/GcJ8uUcsh54VXWPMlIXJqsy83C";
    const hashed = await bcrypt.hash(password, salt);

    console.log("hashed", hashed );

    // Compare сравнение с уже переделанными паролями

    const isTheSame = bcrypt.compare("123456", hashed);
    console.log("isTheSame:", isTheSame)
}

main();