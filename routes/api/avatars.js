import { Router } from 'express';
import {
	rootDirectory,
	getFilePath,
} from '../../repositories/avatars.js';

const router = Router();

router.get('/:fileName', async (req, res) => {
	const fileName = req.params.fileName;

	const filePath = getFilePath(fileName);
	res.sendFile(filePath, { root: rootDirectory });
});

export default router;
