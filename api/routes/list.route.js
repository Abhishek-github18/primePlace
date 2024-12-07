import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createListing, deleteLisitng, getAllListing, getListing } from '../controller/listing.controller.js';

const listRouter = express.Router();

listRouter.get('/get', getAllListing);
listRouter.get('/:id', getListing);
listRouter.post('/create', verifyUser, createListing);
listRouter.delete('/delete/:id', verifyUser, deleteLisitng);

export default listRouter