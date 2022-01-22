import jimp from 'jimp';

class cloudeStorage {
    constructor(Storage, file, user){
        this.storage = new Storage(file, user),
        this.pathFile = file.path
    }

    async save(){

    }

}

export default cloudeStorage