import repositoryContacts from '../../repository/contacts.js';
import {httpCode} from '../../lib/constants.js';
import {LocalFileStorage, UploadFileService, CloudFileStorage} from '../../service/file-storage/index.js'

const agregation = async (req, res, next) =>{
    // console.log('agregation', req.params);
    const {id} = req.params;
    const data = await repositoryContacts.getStatisticContacts(id)
    // console.log('data', data);
    if (data) {
        return res.status(httpCode.OK)
        .json({status: 'success', code: httpCode.OK, data});

    }
    res.status(httpCode.NOT_FOUND)
    .json({message: `not found contact `})
};

const uploadAvatar = async(req, res, next) =>{
    const uploadServis = new UploadFileService(LocalFileStorage, req.file, req.user)
    const avatarUrl = await uploadServis.updateAvatar();


    res.status(httpCode.OK).json({
        status: 'success',
        code: httpCode.OK,
        message: 'Success!!!',
        data: {avatarUrl}

    })
}

export {agregation, uploadAvatar}