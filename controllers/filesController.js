import express from 'express';
import { NotAuthorizedError } from '../helpers/error.js';

const uploadController = async (req, res) => {
    res.json({ status: 'success' });
};

export default uploadController;
