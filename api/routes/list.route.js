import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createListing, deleteLisitng } from '../controller/listing.controller.js';

const listRouter = express.Router();

listRouter.post('/create', verifyUser, createListing);
listRouter.delete('/delete/:id', verifyUser, deleteLisitng);

export default listRouter