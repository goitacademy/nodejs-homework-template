import { bcrypt } from "bcrypt"

const pass = "password"

const main = async () => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);

    await verify(pass, hash)
    await verify("innehaslo", hash)

}

main();

const verify = async (pass, hash) => {
    const pulledSalt = hash.slice(0, 29);
    const hashCompare = await bcrypt.hash(pass, pulledSalt);
    console.log(hash === hashCompare)

}