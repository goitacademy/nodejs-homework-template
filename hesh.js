const bcrypt = require("bcrypt");

const createHashPassword = async(password) => {
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt); //кількість солі - рівень складності хешування 
    // const result = await bcrypt.hash(password, salt);
    const result = await bcrypt.hash(password, 10); //хешування password
    // console.log(result);
    const compareResult1 = await bcrypt.compare(password, result); //порявняння password і хешу з бази
    console.log(compareResult1);
    const compareResult2 = await bcrypt.compare("123457", result);
    console.log(compareResult2);
};

createHashPassword("123456");